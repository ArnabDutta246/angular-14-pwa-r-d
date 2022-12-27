import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicNgxsPageRoutingModule } from './basic-ngxs-routing.module';

import { BasicNgxsPage } from './basic-ngxs.page';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './ngxs/basic-ngxs.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicNgxsPageRoutingModule,
    NgxsModule.forFeature([PostState])
  ],
  declarations: [BasicNgxsPage]
})
export class BasicNgxsPageModule { }
