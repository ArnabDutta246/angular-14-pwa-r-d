import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicNgxsPage } from './basic-ngxs.page';

const routes: Routes = [
  {
    path: '',
    component: BasicNgxsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicNgxsPageRoutingModule {}
