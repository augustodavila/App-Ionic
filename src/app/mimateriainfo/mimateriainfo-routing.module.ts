import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MimateriainfoPage } from './mimateriainfo.page';

const routes: Routes = [
  {
    path: '',
    component: MimateriainfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MimateriainfoPageRoutingModule {}
