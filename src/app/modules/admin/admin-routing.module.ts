import { RouterModule, Routes } from '@angular/router';

import { AddProductComponent } from 'src/app/admin/pages/products/add-product/add-product.component';
import { AdminAuthGuard } from 'src/app/providers/guards/admin-auth.guard';
import { AdminOrdersComponent } from 'src/app/admin/pages/admin-orders/admin-orders.component';
import { AlladminsComponent } from 'src/app/admin/pages/admins/alladmins/alladmins.component';
import { AllusersComponent } from 'src/app/admin/pages/users/allusers/allusers.component';
import { EditProductComponent } from 'src/app/admin/pages/products/edit-product/edit-product.component';
import { NgModule } from '@angular/core';
import { ProductsAdminComponent } from 'src/app/admin/pages/products/products.component';
import { SingleuserComponent } from 'src/app/admin/pages/users/singleuser/singleuser.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'users',
        children: [
          { path: '', component: AllusersComponent },
          { path: 'singleUser/:userId', component: SingleuserComponent },
        ],
      },
      {
        path: 'admins',
        children: [{ path: '', component: AlladminsComponent }],
      },
      {
        path: 'products',
        children: [
          { path: '', component: ProductsAdminComponent },
          { path: 'create', component: AddProductComponent },
          { path: 'editProduct/:productId', component: EditProductComponent },
        ],
      },
      {
        path: 'orders',
        children: [{ path: '', component: AdminOrdersComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
export const routingComponents = [
  AddProductComponent,
  AllusersComponent,
  SingleuserComponent,
  AlladminsComponent,
  AdminOrdersComponent,
  EditProductComponent,
  ProductsAdminComponent,
];
