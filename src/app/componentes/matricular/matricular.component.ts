import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from "../../servicios/auth.service";


@Component({
  selector: 'app-matricular',
  templateUrl: './matricular.component.html',
  styleUrls: ['./matricular.component.scss'],
})
export class MatricularComponent implements OnInit {
  
  public materia : any;
  
  constructor( public alertController: AlertController ,private navparams : NavParams, private modal : ModalController, public AFauth: AngularFireAuth, public aService : AuthService, public db : AngularFirestore, private router : Router) { }

  ngOnInit() {
    this.materia = this.navparams.get('materia');
  }

  closeModal(){
    this.modal.dismiss()
  }
  matricular(){
    this.db.collection('users').doc(this.aService.usuario.uid).collection("materias").doc(this.materia.id).set({
      nombre : this.materia.nombre,
      id : this.materia.id
    });
    this.router.navigate(['/home/materias']);
    this.closeModal()
  }
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Matricularse a ' + this.materia.nombre,
      message: 'Estas seguro que deseas matricularte a ' + this.materia.nombre,
      buttons: [{
        text:"Matricular",
        handler: (blah) => {
        this.matricular();
      }}]
    });

    await alert.present();
  }

}
