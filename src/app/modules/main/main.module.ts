import { MainRoutingModule, routingComponents } from './main-routing.module';

import { AdsComponent } from 'src/app/main/pages/home/ads/ads.component';
import { BrandsComponent } from 'src/app/main/pages/home/brands/brands.component';
import { CartItemComponent } from 'src/app/main/pages/user/cart/cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { FooterBottomComponent } from 'src/app/main/layout/footer/footer-bottom/footer-bottom.component';
import { FooterComponent } from 'src/app/main/layout/footer/footer.component';
import { FooterMiddleComponent } from 'src/app/main/layout/footer/footer-middle/footer-middle.component';
import { FooterTopComponent } from 'src/app/main/layout/footer/footer-top/footer-top.component';
import { HeroComponent } from 'src/app/main/pages/home/hero/hero.component';
import { LayoutComponent } from 'src/app/main/layout/layout.component';
import { NavCategoriesComponent } from 'src/app/main/layout/navbar/nav-categories/nav-categories.component';
import { NavbarComponent } from 'src/app/main/layout/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { OrderItemComponent } from 'src/app/main/pages/user/orders/order-item/order-item.component';
import { ProductComponent } from 'src/app/main/pages/home/product/product.component';
import { ProductsComponent } from 'src/app/main/pages/home/products/products.component';
import { ReviewComponent } from 'src/app/main/pages/product-details/review/review.component';
import { SectionKidsComponent } from 'src/app/main/pages/home/section-kids/section-kids.component';
import { SectionMenComponent } from 'src/app/main/pages/home/section-men/section-men.component';
import { SectionTrendingComponent } from 'src/app/main/pages/home/section-trending/section-trending.component';
import { SectionWomenComponent } from 'src/app/main/pages/home/section-women/section-women.component';
import { SharedModule } from '../shared.module';
import { SidebarComponent } from 'src/app/main/pages/user/sidebar/sidebar.component';

@NgModule({
  declarations: [
    routingComponents,
    HeroComponent,
    ProductsComponent,
    SectionTrendingComponent,
    SectionWomenComponent,
    SectionKidsComponent,
    ProductComponent,
    SectionMenComponent,
    AdsComponent,
    NavbarComponent,
    NavCategoriesComponent,
    FooterComponent,
    FooterTopComponent,
    FooterBottomComponent,
    BrandsComponent,
    LayoutComponent,
    FooterMiddleComponent,
    ReviewComponent,
    CartItemComponent,
    OrderItemComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, SharedModule, MainRoutingModule],
})
export class MainModule {}
