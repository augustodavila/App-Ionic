import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-newexamen',
  templateUrl: './newexamen.component.html',
  styleUrls: ['./newexamen.component.scss'],
})
export class NewexamenComponent implements OnInit {

  public materia : any;
  name:string;
  fecha:string;
 

  constructor(private modal : ModalController,private navparams : NavParams, private db : AngularFirestore) { }

  ngOnInit() {
    this.materia = this.navparams.get("materia")
  }


  closeModal(){
    this.modal.dismiss()
  }

  crearExamen(name, fecha){
    const nuevaFecha = fecha.slice(8,10) + "/" + fecha.slice(5,7) + "/" + fecha.slice(2,4)
    this.db.collection("materias").doc(this.materia.id).collection("examenes").add({
      nombre : name,
      fecha : nuevaFecha,
    })
    this.closeModal()
  }
}
