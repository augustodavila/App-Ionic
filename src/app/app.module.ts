import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MatricularComponent } from "./componentes/matricular/matricular.component";
import { MismateriasComponent } from './componentes/mismaterias/mismaterias.component';
import { MateriasperfilComponent } from './componentes/materiasperfil/materiasperfil.component';

@NgModule({
  declarations: [AppComponent, MatricularComponent, MismateriasComponent,MateriasperfilComponent],
  entryComponents: [MatricularComponent, MismateriasComponent, MateriasperfilComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
