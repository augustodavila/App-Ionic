import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, NavParams, PickerController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';


interface alumno{
  name : string;
  uid : string;
}


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent implements OnInit {

  public nota : any = [];
  public examen : any;
  public materia : any;
  public alumnos : any = [];

  constructor(private navparams : NavParams, private modal : ModalController, public AFauth: AngularFireAuth,
    public aService : AuthService, public db : AngularFirestore, private router : Router, private pickerCtrl : PickerController) {}

  ngOnInit() {
    this.examen = this.navparams.get('examen');
    this.materia = this.navparams.get('materia');
    this.getAlumnos().subscribe( alumno => {
      this.alumnos = alumno
    })
  }

  closeModal(){
    this.modal.dismiss()
  }

  getAlumnos(){
    return this.db.collection('materias').doc(this.materia.id).collection('alumnos').snapshotChanges().pipe(map(sala =>{
      return sala.map(a =>{
        const data = a.payload.doc.data() as alumno;
        data.uid = a.payload.doc.id;
        return data;
      })
    }))
  }

  setNotas(){
    for (let index = 0; index < this.alumnos.length; index++) {
      const alumno = this.alumnos[index];
      if (!(this.nota[index] == null)){
        this.db.collection('materias').doc(this.materia.id).collection("alumnos").doc(alumno.uid).collection("notas").doc(this.examen.id).set({
          nota: this.nota[index]
        })
      }
    }
    this.closeModal()
  }
  
  prueba(){
    console.log(this.nota)
  }
}
