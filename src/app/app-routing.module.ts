import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('./pages/rxjs/rxjs.module').then(m => m.RxjsPageModule)
  },
  {
    path: 'indexed-db',
    loadChildren: () => import('./pages/indexed-db/indexed-db.module').then(m => m.IndexedDBPageModule)
  },
  {
    path: 'lead',
    loadChildren: () => import('./pages/lead/lead.module').then(m => m.LeadPageModule)
  },
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'folder/Inbox',
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
