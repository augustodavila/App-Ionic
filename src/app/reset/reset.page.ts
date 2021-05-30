import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  email: string;
  password: string;

  constructor(private alertCtrl:AlertController, private authService: AuthService, public router: Router ) { }

  ngOnInit() {
  }
  resetPassword(email){
    this.authService.resetPassword(this.email).
    then(
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Revisa tu casilla de correos para cambiar la contraseña',
          buttons: [{text: 'ok', role:'cancel', handler: ()=>{
            this.router.navigateByUrl('login');
          },},],
        });
        await alert.present();
        
      },
      async error => { 
        const errorAlert = await this.alertCtrl.create({
          message:error.message,
          buttons:[{text:'ok', role:'cancel'}],
        });
        await errorAlert.present();
      }
    );
  }}