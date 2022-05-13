import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Autoplay,
  EffectFlip,
  FreeMode,
  Navigation,
  Thumbs,
} from 'swiper';

import { CartService } from 'src/app/providers/services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/providers/services/products.service';
import { UsersService } from 'src/app/providers/services/users.service';
import { environment } from 'src/environments/environment';

// install Swiper modules
SwiperCore.use([Autoplay, FreeMode, Navigation, EffectFlip, Thumbs]);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  apiURL = environment.apiURL;
  thumbsSwiper: any;
  isLoaded: boolean = false;
  AddingToCart: boolean = false;
  discountPrice: number = 0;
  totalRating: number = 0;
  quantity: number = 1;
  size: string = '';
  color: string = '';
  product: Product = {
    _id: '',
    brand: '',
    shortName: '',
    longName: '',
    description: '',
    specifications: '',
    price: 0,
    mainImage: '',
    categories: [],
    sizes: [],
    colors: [],
    images: [],
    inventoryQuantity: 0,
    discount: {
      percentage: 0,
      active: false,
    },
    bestSeller: false,
    reviewsRatings: [],
  };
  constructor(
    public _auth: UsersService,
    private _products: ProductsService,
    private _cart: CartService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSingleProduct();
  }
  getSingleProduct() {
    this._products
      .getSingleProduct(this._route.snapshot.params['productId'])
      .subscribe(
        (data) => {
          this.product = data.data;
          this.product.specifications = this._sanitizer.bypassSecurityTrustHtml(
            this.product.specifications
          );
          this.product.description = this._sanitizer.bypassSecurityTrustHtml(
            this.product.description
          );
          console.log(this.product.specifications);
          if (this.product.reviewsRatings.length) {
            const rating =
              5 *
              (this.product.reviewsRatings.reduce(
                (acc: any, curr: any) => acc + curr,
                0
              ) /
                (this.product.reviewsRatings.length * 5));
            this.totalRating = Math.round(rating);
          }
          this.discountPrice =
            (this.product.price * (100 - this.product.discount?.percentage)) /
            100;
          this.color = this.product.colors[0];
          this.size = this.product.sizes[0];
          this.isLoaded = true;
        },
        (err) => {
          console.log(err);
          this.isLoaded = true;
        }
      );
  }
  addToCart(productId: string) {
    this.AddingToCart = true;
    if (this._auth.isAuthed) {
      if (this.quantity > 0) {
        this._cart
          .addCartItem(productId, {
            price: this.discountPrice,
            quantity: this.quantity,
            size: this.size,
            color: this.color,
          })
          .subscribe(
            () => {
              this.AddingToCart = false;
              this._cart.cartCount = this._cart.cartCount + 1;
              this._cart.getMyCart().subscribe(() => {
                this._router.navigate(['/cart']);
              });
            },
            (err) => {
              console.log(err);
              this.AddingToCart = false;
              this._snackbar.open('Server Error', '', {
                duration: 2000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['red-snackbar'],
              });
            },
            () => {}
          );
      } else {
        this._snackbar.open('Quantity must be greater than 0', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
        });
      }
    } else {
      this._snackbar.open('Please Login to add to The Cart', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
      });
    }
  }
  createRange(num: number) {
    return new Array(num);
  }
  changeColor(color: string) {
    this.color = color;
  }
  changeSize(size: string) {
    this.size = size;
  }
  checkQuantity() {
    if (this.quantity > this.product.inventoryQuantity) {
      this.quantity = this.product.inventoryQuantity;
    }
  }
}
