import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionalDetailsModalPage } from './professional-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionalDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionalDetailsModalPageRoutingModule {}
