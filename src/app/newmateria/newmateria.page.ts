import { Component, OnInit, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-newmateria',
  templateUrl: './newmateria.page.html',
  styleUrls: ['./newmateria.page.scss'],
})
export class NewmateriaPage implements OnInit {

  public user : any = []
  name:string;
  img:string;
  hora1:string;
  hora2: string;
  dia: string;

  constructor( public authService : AuthService, public db : AngularFirestore, public router : Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user = this.authService.usuario
  }
  crearMateria(name, img, dia, hora1, hora2, profesor){
    hora1 = hora1.slice(11,16)
    hora2 = hora2.slice(11,16)
    this.db.collection("materias").add({
      nombre : name,
      img : img,
      profesor : profesor,
      horarios: dia + ": " + hora1 + " - " + hora2,
    }).then(docId => {
      this.db.collection("users").doc(this.user.uid).collection("mismaterias").doc(docId.id).set({
        nombre: name,
        id: docId.id
      })
    })
    this.router.navigate(['/home/materias']);
  }
}
