import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicNgxsPageRoutingModule } from './basic-ngxs-routing.module';

import { BasicNgxsPage } from './basic-ngxs.page';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './ngxs/basic-ngxs.state';
import { HeaderModule } from 'src/app/shared-components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicNgxsPageRoutingModule,
    HeaderModule,
    NgxsModule.forFeature([PostState])
  ],
  declarations: [BasicNgxsPage]
})
export class BasicNgxsPageModule { }
