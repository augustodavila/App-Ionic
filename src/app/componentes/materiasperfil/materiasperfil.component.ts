import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, NavParams } from '@ionic/angular';
import { map } from 'rxjs/operators';


interface examen{
  nombre : string
  fecha : string
  id : string
}

@Component({
  selector: 'app-materiasperfil',
  templateUrl: './materiasperfil.component.html',
  styleUrls: ['./materiasperfil.component.scss'],
})
export class MateriasperfilComponent implements OnInit {

  public materia : any;
  public examenes : any = [];

  constructor(public db: AngularFirestore, private navparams : NavParams, private modal : ModalController) { }

  ngOnInit() {
    this.materia = this.navparams.get('materia');
    this.getExamenes().subscribe( examen => {
      this.examenes = examen
    })
  }

  prueba(){
    console.log(this.examenes)
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

  crearExamen(name, fecha){
    this.db.collection("materias").doc(this.materia.id).collection("examenes").doc().set({
      nombre: name,
      fecha: fecha,
    })
  }
}
