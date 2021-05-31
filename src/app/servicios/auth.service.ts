import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { promise } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario;

  constructor(private AFauth : AngularFireAuth, private db : AngularFirestore, public navController: NavController) {   
  }

  login(email:string, password:string){

    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {resolve(user);
      }).catch(err => rejected(err));
    })
  }

  resetPassword(email:string):Promise<void>{
    return this.AFauth.sendPasswordResetEmail(email);
  }

  singUpUser(email:string, password:string):Promise<any>{
    return this.AFauth.createUserWithEmailAndPassword(email,password);
  }

  logOut():Promise<void>{
    return this.AFauth.signOut();
  }

  getUserData(uid){
       if (!this.usuario){
        this.db.collection('users').doc(uid).get().subscribe(data => {
          this.usuario = data.data();
        })
       }
    }
  

}

