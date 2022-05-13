import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/providers/services/cart.service';
import { OrdersService } from 'src/app/providers/services/orders.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  date: Date = new Date();

  constructor(
    public _cart: CartService,
    private _orders: OrdersService,
    private _user: UsersService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  placeOrder() {
    this._orders
      .placeOrder({
        price: this._cart.totalPrice,
        shipping: {
          name: this._user.userData.name,
          adress: this._user.userData.adress,
          phone: this._user.userData.phone,
        },
        products: this._cart.cartData,
        paymentMethod: 'paypal',
        date: new Date(),
        status: 'Ordered',
      })
      .subscribe(
        (res) => {
          console.log(res.data);
          this._cart.clearCart();
          this._router.navigate(['/user/orders']);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }
}
