import { AdminRoutingModule, routingComponents } from './admin-routing.module';

import { AddProductComponent } from 'src/app/admin/pages/products/add-product/add-product.component';
import { AdminLayoutComponent } from 'src/app/admin/layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from 'src/app/admin/components/create-category/create-category.component';
import { DeleteCategoryComponent } from 'src/app/admin/components/delete-category/delete-category.component';
import { EditCategoryComponent } from 'src/app/admin/components/edit-category/edit-category.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SidebarAdminComponent } from '../../admin/layout/sidebar-admin/sidebar-admin.component';
import { TopbarComponent } from '../../admin/layout/topbar-admin/topbar.component';

@NgModule({
  declarations: [
    routingComponents,
    TopbarComponent,
    SidebarAdminComponent,
    CreateCategoryComponent,
    DeleteCategoryComponent,
    EditCategoryComponent,
    AddProductComponent,
    AdminLayoutComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
