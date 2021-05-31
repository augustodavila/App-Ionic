import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  constructor(private AFauth : AngularFireAuth, private router: Router, public aService : AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AFauth.authState.pipe(map( auth => {

        if (isNullOrUndefined(auth)){
          return true
        }else{
          this.router.navigate(['/home/materias'])
          this.aService.getUserData(auth.uid)
          console.log(auth.uid)
          return false
        }
      }))
  }
  
}
