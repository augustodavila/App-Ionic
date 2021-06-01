import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { MateriasperfilComponent } from 'src/app/componentes/materiasperfil/materiasperfil.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriasService, materia } from 'src/app/servicios/materias.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public user : any = []
  public allmaterias : any = [];
  public mismaterias : any = [];


  constructor(public modal : ModalController, private authService: AuthService, public router: Router, public materiasservice : MateriasService, public db: AngularFirestore) {
  }

  ngOnInit(){
    this.authService.getUsuario().subscribe(usuario=>{
      if (usuario){
        this.user = usuario
        this.materiasservice.getMaterias().subscribe( materias => {
          this.allmaterias = materias
        })
        this.getMisMaterias().subscribe( materias => {
          this.mismaterias = materias
        })
      }
    })
    
  }

  getMisMaterias(){
    return this.db.collection('users').doc(this.user.uid).collection("mismaterias").snapshotChanges().pipe(map(sala =>{
      return sala.map(a =>{
        const data = a.payload.doc.id;
        return data;
      })
    }))
  }


  ionViewWillEnter(){
    console.log(this.user)
  }

  logOut(){
    this.authService.logOut().then( res => { 
      this.router.navigate(['/login']);
     }).catch(err => alert('No se pudo cerrar sesion'));
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
      component: MateriasperfilComponent,
      componentProps: {
        materia : materia
      }
    }).then((modal) => modal.present())
  }
}
