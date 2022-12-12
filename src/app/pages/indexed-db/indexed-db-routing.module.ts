import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexedDBPage } from './indexed-db.page';

const routes: Routes = [
  {
    path: '',
    component: IndexedDBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexedDBPageRoutingModule {}
