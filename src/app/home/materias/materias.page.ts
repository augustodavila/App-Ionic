import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { map, materialize } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriasService, materia } from 'src/app/servicios/materias.service';
import { ModalController } from "@ionic/angular";
import { MismateriasComponent } from "../../componentes/mismaterias/mismaterias.component";


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  public usuario;

  constructor(private authService: AuthService, public router: Router, private menu: MenuController, public materiasservice : MateriasService,
     public db : AngularFirestore, public modal : ModalController) {}

  public allmaterias : any = [];
  public mismaterias : any = [];
  

  ngOnInit(){
    this.authService.getUsuario().subscribe(usuario=>{
      if (usuario){
        this.usuario = usuario
        console.log(this.usuario,'hollllllaaaaaa')
        this.materiasservice.getMaterias().subscribe( materias => {
          this.allmaterias = materias
        })
        this.getMateriasUser().subscribe( materias => {
          this.mismaterias = materias
        })
      }
    })
  }
  
  

  getMateriasUser(){
    return this.db.collection('users').doc(this.usuario.uid).collection("materias").snapshotChanges().pipe(map(sala =>{
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
