import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoaderCheckPageRoutingModule } from './loader-check-routing.module';

import { LoaderCheckPage } from './loader-check.page';
import { HeaderModule } from 'src/app/shared-components/header/header.module';
import { NgxsModule } from '@ngxs/store';
import { ApiLoaderState } from 'src/app/services/intercept/api-loader-state/loader.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderCheckPageRoutingModule,
    HeaderModule,
    NgxsModule.forFeature([ApiLoaderState])
  ],
  declarations: [LoaderCheckPage]
})
export class LoaderCheckPageModule { }
