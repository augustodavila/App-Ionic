import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { NotasComponent } from '../componentes/notas/notas.component';

interface examen{
  nombre : string
  fecha : string
  id : string
}

@Component({
  selector: 'app-mimateriainfo',
  templateUrl: './mimateriainfo.page.html',
  styleUrls: ['./mimateriainfo.page.scss'],
})
export class MimateriainfoPage implements OnInit {

  public materia: any;
  public examenes : any = [];

  constructor(private router : Router, private route : ActivatedRoute, public modal : ModalController, public db : AngularFirestore) {
   if(this.router.getCurrentNavigation().extras.state) {
     this.materia = this.router.getCurrentNavigation().extras.state.materia
   }
  }

  ngOnInit() {
    this.getExamenes().subscribe( examen => {
      this.examenes = examen
    })      
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

  openModal(examen){
    this.modal.create({
      component: NotasComponent,
      componentProps: {
        examen : examen,
        materia : this.materia
      }
    }).then((modal) => modal.present())
  }

  prueba(){
    console.log(this.examenes)
  }

}
