import { Component, OnInit } from '@angular/core';
import { MateriasService, materia } from '../servicios/materias.service';
import { ModalController } from "@ionic/angular";
import { MatricularComponent } from '../componentes/matricular/matricular.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-materias',
  templateUrl: './all-materias.page.html',
  styleUrls: ['./all-materias.page.scss'],
})
export class AllMateriasPage implements OnInit {

  public allmaterias : any = [];

  constructor(public materiasservice: MateriasService, public modal : ModalController, public router : Router) { }

  ngOnInit() {
    this.materiasservice.getMaterias().subscribe( materias => {
      this.allmaterias = materias
    })
  }
  openModal(materia){
    this.modal.create({
      component: MatricularComponent,
      componentProps: {
        materia : materia
      }
    }).then((modal) => modal.present())
  }

  crearMateria(){
    this.router.navigate(['/newmateria'])
  }
}
