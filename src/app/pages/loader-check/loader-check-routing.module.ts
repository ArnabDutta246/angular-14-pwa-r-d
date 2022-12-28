import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoaderCheckPage } from './loader-check.page';

const routes: Routes = [
  {
    path: '',
    component: LoaderCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoaderCheckPageRoutingModule {}
