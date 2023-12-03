/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponentComponent } from './auth-component/auth-component.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    component: AuthComponentComponent
  },
  {
    path: 'auth',
    component: AuthComponentComponent
  },
  {
    path: 'professional-details-modal',
    loadChildren: () => import('./professional-details-modal/professional-details-modal.module').then( m => m.ProfessionalDetailsModalPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
