import { Component, Input, OnInit } from '@angular/core';

import { CartService } from 'src/app/providers/services/cart.service';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../products/products.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  apiURL = environment.apiURL;
  totalRating: number = 0;
  serverErrMsg = '';
  discountPrice: number = 0;
  colorsVisible: boolean = true;
  sizesVisible: boolean = false;
  constructor(private _cart: CartService) {}

  ngOnInit(): void {
    this.discountPrice =
      (this.product.price * (100 - this.product.discount?.percentage)) / 100;
  }
  createRange(num: number, product: Product) {
    if (product.reviewsRatings.length) {
      const rating =
        5 *
        (product.reviewsRatings.reduce((acc: any, curr: any) => acc + curr, 0) /
          (product.reviewsRatings.length * 5));
      this.totalRating = Math.round(rating);
    }

    return new Array(num);
  }
}
