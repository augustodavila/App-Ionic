import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email:string;
  name:string;
  password:string;
  password2:string;
  carrera: string;
  nacimiento: string;

  constructor(private alertCtrl:AlertController, private authService: AuthService, public router: Router, private db : AngularFirestore ) { }

  ngOnInit() {
  }

  async singUpUser(email, name, password, password2, carrera, nacimiento):Promise<void>{
    if (password == password2){
        this.authService.singUpUser(email, password).then( res =>{
            const uid = res.user.uid
            this.db.collection("users").doc(res.user.uid).set({
              name : name,
              uid : uid,
              carrera : carrera,
              nacimiento : nacimiento,
              mail : email,
            })
            this.router.navigate(['/home/materias']);
        })
       async error => {
          const alert = await this.alertCtrl.create({
            message:error.message,
           buttons:[{text:'ok',role:'cancel'}],
         });
         await alert.present();
        }
    }
    else{
      const alert = await this.alertCtrl.create({
        message: "Contraseñas no coinciden",
        buttons:[{text:'ok',role:'cancel'}],
      });
      await alert.present();
    }
  }
}
