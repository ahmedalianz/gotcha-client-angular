import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from 'src/app/main/pages/information/about/about.component';
import { AuthGuard } from 'src/app/providers/guards/auth.guard';
import { CartComponent } from 'src/app/main/pages/user/cart/cart.component';
import { ContactComponent } from 'src/app/main/pages/information/contact/contact.component';
import { HomeComponent } from 'src/app/main/pages/home/home.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from 'src/app/main/pages/user/orders/orders.component';
import { ProductDetailsComponent } from 'src/app/main/pages/product-details/product-details.component';
import { ProfileComponent } from 'src/app/main/pages/user/profile/profile.component';
import { ReturnComponent } from 'src/app/main/pages/policy/return/return.component';
import { ShippingComponent } from 'src/app/main/pages/policy/shipping/shipping.component';
import { TermsComponent } from 'src/app/main/pages/policy/terms/terms.component';
import { UserAuthComponent } from 'src/app/main/pages/user/user-auth/user-auth.component';
import { UserLayoutComponent } from 'src/app/main/layout/user-layout/user-layout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'policy',
    children: [
      { path: 'return', component: ReturnComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'terms', component: TermsComponent },
    ],
  },
  {
    path: 'information',
    children: [
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  { path: 'register', component: UserAuthComponent },
  { path: 'login', component: UserAuthComponent },
  { path: 'cart', component: CartComponent },

  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },

      { path: 'orders', component: OrdersComponent },
    ],
  },
  { path: 'products/:productId', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
export const routingComponents = [
  ReturnComponent,
  ShippingComponent,
  HomeComponent,
  TermsComponent,
  UserLayoutComponent,
  ContactComponent,
  AboutComponent,
  UserAuthComponent,
  ProfileComponent,
  CartComponent,
  OrdersComponent,
  ProductDetailsComponent,
];
