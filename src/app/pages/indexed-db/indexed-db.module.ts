import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexedDBPageRoutingModule } from './indexed-db-routing.module';

import { IndexedDBPage } from './indexed-db.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexedDBPageRoutingModule
  ],
  declarations: [IndexedDBPage]
})
export class IndexedDBPageModule {}
