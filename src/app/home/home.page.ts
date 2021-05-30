import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, public router: Router, private menu: MenuController) {}

  logOut(){
    this.authService.logOut().then( res => { 
      this.router.navigate(['/login']);
     }).catch(err => alert('No se pudo cerrar sesion'));
  }
}
