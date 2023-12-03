import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionalDetailsModalPageRoutingModule } from './professional-details-modal-routing.module';

import { ProfessionalDetailsModalPage } from './professional-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessionalDetailsModalPageRoutingModule
  ],
  declarations: [ProfessionalDetailsModalPage]
})
export class ProfessionalDetailsModalPageModule {}
