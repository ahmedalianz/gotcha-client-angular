import { RouterModule, Routes } from '@angular/router';

import { AdminAuthComponent } from './admin/pages/admin-auth/admin-auth.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { Error404Component } from './main/pages/error404/error404.component';
import { LayoutComponent } from './main/layout/layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/main/main.module').then((mod) => mod.MainModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./modules/admin/admin.module').then((mod) => mod.AdminModule),
  },

  {
    path: 'admin-auth/login',
    component: AdminAuthComponent,
  },

  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
