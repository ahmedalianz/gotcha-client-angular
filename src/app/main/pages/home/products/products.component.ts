import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';

import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/providers/services/products.service';

// install Swiper modules
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() title: string = '';
  @Input() categoryName: string = '';
  noMoreData: boolean = false;
  products: Product[] = [];
  public loading: boolean = true;
  constructor(private _products: ProductsService) {}
  ngOnInit(): void {
    this.getProductsByCategory();
  }
  getProductsByCategory() {
    this._products.getProductsByCategory(this.categoryName).subscribe(
      (data) => {
        this.products = data.data;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
