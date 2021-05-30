import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewmateriaPageRoutingModule } from './newmateria-routing.module';

import { NewmateriaPage } from './newmateria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewmateriaPageRoutingModule
  ],
  declarations: [NewmateriaPage]
})
export class NewmateriaPageModule {}
