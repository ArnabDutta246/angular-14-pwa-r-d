import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { HeaderModule } from 'src/app/shared-components/header/header.module';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentThreeComponent } from './component-three/component-three.component';
import { InjectorShareService } from './shared-injector/injectors';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    HeaderModule
  ],
  declarations: [
    DashboardPage,
    ComponentOneComponent,
    ComponentTwoComponent,
    ComponentThreeComponent
  ],
  exports: [
    ComponentOneComponent,
    ComponentTwoComponent,
    ComponentThreeComponent
  ],
  providers: [
  ]
})
export class DashboardPageModule { }
