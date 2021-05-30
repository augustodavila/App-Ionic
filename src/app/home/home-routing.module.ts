import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: './materias',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage,
    children: [{
      path: 'materias',
      loadChildren: () => import('./materias/materias.module').then( m => m.MateriasPageModule)
    },
    {
      path: 'perfil',
      loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
    },
    {
      path: 'calendario',
      loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
    }]
  }
  ]
    

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
