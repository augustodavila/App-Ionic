import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllMateriasPageRoutingModule } from './all-materias-routing.module';

import { AllMateriasPage } from './all-materias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllMateriasPageRoutingModule
  ],
  declarations: [AllMateriasPage]
})
export class AllMateriasPageModule {}
