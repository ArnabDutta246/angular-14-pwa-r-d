import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';

import { RxjsPage } from './rxjs.page';

const routes: Routes = [
  {
    path: '',
    component: RxjsPage,
    children: [
      {
        path: 'combine-latest',
        component: CombineLatestComponent
      }
    ]
  },
  {
    path: 'rxjs',
    redirectTo: 'rxjs/combine-latest',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsPageRoutingModule { }
