import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface materia {
  nombre : string
  profesor : string
  img : string
  horarios : string
  id : string
}

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private db : AngularFirestore) { }

  getMaterias(){
    return this.db.collection('materias').snapshotChanges().pipe(map(sala =>{
      return sala.map(a =>{
        const data = a.payload.doc.data() as materia;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
}
