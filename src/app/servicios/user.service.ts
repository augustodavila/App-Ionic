import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

export interface user {
  name : string,
  uid : string,
  carrera : string,
}


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public aService: AuthService, private db : AngularFirestore) {}

  getUser(){
    return this.db.collection('users').snapshotChanges().pipe(map(sala =>{
      return sala.map(a =>{
        const data = a.payload.doc.data() as user;
        data.uid = a.payload.doc.id;
        return data;
      })
    }))
  }


}
 
