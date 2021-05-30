import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewmateriaPage } from './newmateria.page';

const routes: Routes = [
  {
    path: '',
    component: NewmateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewmateriaPageRoutingModule {}
