import { Component, Input, OnInit } from '@angular/core';

import { CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/providers/services/cart.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input()
  cartItem!: CartItem;
  @Input()
  i!: number;
  editConfirm: string = '';
  confirmTxt: string = 'Confirm';
  apiURL = environment.apiURL;
  quantity: number = 0;
  constructor(public _cart: CartService) {}

  ngOnInit(): void {
    this.quantity = this.cartItem.quantity;
  }

  onChangeQunatity(event: any) {
    this.editConfirm = 'show';
    this.quantity = event.target.value;
  }
  checkQuantity() {
    if (this.cartItem.product)
      if (this.quantity > this.cartItem.product.inventoryQuantity)
        this.quantity = this.cartItem.product.inventoryQuantity;
  }

  editCartItem() {
    this.confirmTxt = 'Confirming';
    if (this.cartItem._id)
      this._cart
        .editCart(this.cartItem._id, { quantity: this.quantity })
        .subscribe(
          () => {
            this._cart.getMyCart().subscribe((res) => {
              this._cart.cartData = res.data;
            });
          },
          (err) => {
            console.log(err.error.message);
            console.log(err);
          }
        );
  }
  removeCartItem() {
    if (this.cartItem._id)
      this._cart.removeCartItem(this.cartItem._id).subscribe(() => {
        this._cart.getMyCart().subscribe((res) => {
          this._cart.cartData = res.data;
        });
      });
  }
}
