import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';

interface examen{
  nombre : string
  fecha : string
  id : string
}

@Component({
  selector: 'app-mismaterias',
  templateUrl: './mismaterias.component.html',
  styleUrls: ['./mismaterias.component.scss'],
})
export class MismateriasComponent implements OnInit {

  public materia : any;
  public usuario;
  public examenes : any = [];
  public notas : any =[];

  constructor( public alertController: AlertController ,private navparams : NavParams, private modal : ModalController, public AFauth: AngularFireAuth,
     public aService : AuthService, public db : AngularFirestore, private router : Router) { }

  ngOnInit() {
    this.materia = this.navparams.get('materia');
    this.aService.getUsuario().subscribe(usuario=>{
      if (usuario){
        this.usuario = usuario
      }
    })
    this.getExamenes().subscribe( examen => {
      this.examenes = examen
      this.getNotas()
    })  
  }

  closeModal(){
    this.modal.dismiss()
  }

  getExamenes(){
    return this.db.collection('materias').doc(this.materia.id).collection("examenes").snapshotChanges().pipe(map(sala =>{
      return sala.map(a =>{
        const data = a.payload.doc.data() as examen;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getNotas(){
    for (let index = 0; index < this.examenes.length; index++) {
      this.db.collection('materias').doc(this.materia.id).collection("alumnos").doc(this.usuario.uid).collection("notas").doc(this.examenes[index].id).snapshotChanges().pipe(map(a =>{
        const data = a.payload.data().nota
        return data;
      })).subscribe(nota => {
        this.notas[index] = nota
      })     
    }
  }

  prueba(){
    console.log(this.notas)
  }

  eliminarMateria(){
    this.db.collection('users').doc(this.usuario.uid).collection("materias").doc(this.materia.id).delete();
    this.db.collection('materias').doc(this.materia.id).collection('alumnos').doc(this.usuario.uid).delete();
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
