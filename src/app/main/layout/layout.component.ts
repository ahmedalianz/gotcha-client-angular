import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/providers/services/cart.service';
import { ProductsService } from 'src/app/providers/services/products.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(
    public _router: Router,
    public _user: UsersService,
    public _cart: CartService,
    public _products: ProductsService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._products.getAllCategories();
      this._user.showProfile().subscribe(() => {
        this._cart.getMyCart();
      });
    } else {
      this._products.getAllCategories().subscribe(
        () => {
          this._user.userDataLoading = false;
        },
        (err) => {
          this._user.userDataLoading = false;
          console.log(err);
        }
      );
    }
  }
}
