import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product, Review } from 'src/app/models/product';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/providers/services/products.service';
import { StarRatingComponent } from 'ng-starrating';
import { UsersService } from 'src/app/providers/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() product: Product = {
    _id: '',
    brand: '',
    shortName: '',
    longName: '',
    description: undefined,
    specifications: undefined,
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
  apiURL = environment.apiURL;
  reviews: Review[] = [];
  totalRating: number = 0;
  viewdReviews: Review[] = [];
  page: number = 1;
  finalPage!: number;
  isSubmitted = false;
  rate: any;
  reviewForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  constructor(
    private _auth: UsersService,
    private _review: ProductsService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.product.reviewsRatings.length > 0) {
      this._review.getReviews(this.product._id).subscribe((data: any) => {
        this.reviews = data.data;
        this.viewdReviews = data.data.slice(0, 5);
        this.finalPage = Math.ceil(this.reviews.length / 5);
        const reviewsRatings = this.reviews.map((review) => review.rate);
        const rating =
          5 *
          (reviewsRatings.reduce((acc: any, curr: any) => acc + curr, 0) /
            (reviewsRatings.length * 5));
        this.totalRating = Math.round(rating);
      }),
        (err: any) => {
          console.log(err);
        };
    }
  }

  get message() {
    return this.reviewForm.get('message');
  }
  onRate($event: { newValue: number; starRating: StarRatingComponent }) {
    this.rate = $event.newValue;
  }
  createRange(num: number) {
    return new Array(num);
  }
  getStars(num: number) {
    return this.reviews.filter((review: Review) => review.rate === num).length;
  }
  paginate(num: number) {
    this.page = this.page + num;
    this.viewdReviews = this.reviews.slice((this.page - 1) * 5, 5 * this.page);
  }
  addReview() {
    if (this.reviewForm.valid && this.rate) {
      if (this._auth.isAuthed) {
        let addedReview: any = {
          rate: this.rate,
          date: new Date(),
          message: this.reviewForm.value.message,
          productId: this.product._id,
          user: this._auth.userData._id,
        };
        this.isSubmitted = true;
        this._review.addReview(addedReview).subscribe(
          () => {
            this.isSubmitted = false;
          },
          (error) => {
            console.log(error);
            this.isSubmitted = false;
            this._snackbar.open('Service Error', '', {
              duration: 2000,
              panelClass: ['red-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
          },
          () => {
            window.location.reload();
          }
        );
      } else {
        this._snackbar.open('Please Login First', '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    } else {
      this._snackbar.open(
        'Please Choose a stars rating & Write your Comment',
        '',
        {
          duration: 2000,
          panelClass: ['red-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        }
      );
    }
  }
}
