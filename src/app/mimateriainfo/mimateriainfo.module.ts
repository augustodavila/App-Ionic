import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MimateriainfoPageRoutingModule } from './mimateriainfo-routing.module';

import { MimateriainfoPage } from './mimateriainfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MimateriainfoPageRoutingModule
  ],
  declarations: [MimateriainfoPage]
})
export class MimateriainfoPageModule {}
