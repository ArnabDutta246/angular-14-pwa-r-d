import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadPageRoutingModule } from './lead-routing.module';

import { LeadPage } from './lead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadPageRoutingModule
  ],
  declarations: [LeadPage]
})
export class LeadPageModule {}
