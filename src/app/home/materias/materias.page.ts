import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { map, materialize } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriasService, materia } from 'src/app/servicios/materias.service';
import { ModalController } from "@ionic/angular";
import { MismateriasComponent } from "../../componentes/mismaterias/mismaterias.component";

function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}

async function myAsyncFunction(){
  await delay(5);
  console.log(this.authService.usuario)
    this.getMateriasUser().subscribe( materias => {
      this.mismaterias = materias
    })
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  

  constructor(private authService: AuthService, public router: Router, private menu: MenuController, public materiasservice : MateriasService,
     public db : AngularFirestore, public modal : ModalController) {}

  public allmaterias : any = [];
  public mismaterias : any = [];

  ngOnInit(){
    this.materiasservice.getMaterias().subscribe( materias => {
      this.allmaterias = materias
    })
    myAsyncFunction()
  }
  
  

  getMateriasUser(){
    return this.db.collection('users').doc(this.authService.usuario.uid).collection("materias").snapshotChanges().pipe(map(sala =>{
      return sala.map(a =>{
        const data = a.payload.doc.id;
        return data;
      })
    }))
  }


  logOut(){
    this.authService.logOut().then( res => { 
      this.router.navigate(['/login']);
     }).catch(err => alert('No se pudo cerrar sesion'));
  }
  
  matricularse(){
    this.router.navigate(['/all-materias'])
  }

  materiaMismoId(id, mimateria : any = []){
    var respuesta = false
    for (let index = 0; index < mimateria.length; index++) {
      const element = mimateria[index];
      if (element == id) {
        respuesta = true
      }
    }
    return respuesta
  }

  openModal(materia){
    this.modal.create({
      component: MismateriasComponent,
      componentProps: {
        materia : materia
      }
    }).then((modal) => modal.present())
  }

}
