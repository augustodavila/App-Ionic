import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor(private authService: AuthService, public router: Router, private menu: MenuController) {}

  ngOnInit(){
  }

  logOut(){
    this.authService.logOut().then( res => { 
      this.router.navigate(['/login']);
     }).catch(err => alert('No se pudo cerrar sesion'));
  }

}
