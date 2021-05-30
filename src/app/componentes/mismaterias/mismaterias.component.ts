import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-mismaterias',
  templateUrl: './mismaterias.component.html',
  styleUrls: ['./mismaterias.component.scss'],
})
export class MismateriasComponent implements OnInit {

  public materia : any;

  constructor( public alertController: AlertController ,private navparams : NavParams, private modal : ModalController, public AFauth: AngularFireAuth,
     public aService : AuthService, public db : AngularFirestore, private router : Router) { }

  ngOnInit() {
    this.materia = this.navparams.get('materia');
  }

  closeModal(){
    this.modal.dismiss()
  }

  eliminarMateria(){
    this.db.collection('users').doc(this.aService.usuario.uid).collection("materias").doc(this.materia.id).delete();
    this.router.navigate(['/home/materias']);
    this.closeModal()
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Anular matriculacion de ' + this.materia.nombre,
      message: 'Estas seguro que deseas anular la matriculacion de ' + this.materia.nombre,
      buttons: [{
        text:"Si",
        handler: (blah) => {
        this.eliminarMateria();
      }}]
    });

    await alert.present();
  }
}
