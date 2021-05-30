import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllMateriasPage } from './all-materias.page';

const routes: Routes = [
  {
    path: '',
    component: AllMateriasPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllMateriasPageRoutingModule {}
