import { CartItem } from 'src/app/models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private commonUrl = `${environment.apiURL}cart/`;
  constructor(private _cart: HttpClient, private _user: UsersService) {}
  public cartCount: number = 0;
  public cartLoaded: boolean = false;
  public totalPrice: number = 0;
  public cartData: CartItem[] = [];
  addCartItem(productId: string, data: CartItem): Observable<any> {
    return this._cart.post(`${this.commonUrl}addCartItem/${productId}`, data);
  }
  removeCartItem(cartItemId: string): Observable<any> {
    return this._cart.delete(`${this.commonUrl}removeCartItem/${cartItemId}`);
  }
  getMyCart(): Observable<any> {
    const cartRequest = this._cart.get(`${this.commonUrl}myCart`);
    cartRequest.subscribe(
      (res: any) => {
        this.cartData = res.data;
        this.cartCount = res.data.length;
        this.cartLoaded = true;
        this._user.userDataLoading = false;
        this.totalPrice = res.data.reduce((acc: any, curr: any) => {
          return acc + curr.price * curr.quantity;
        }, 0);
      },
      (err: any) => {
        console.log(err);
        this._user.userDataLoading = false;
      }
    );
    return cartRequest;
  }
  editCart(cartItemId: string, data: any): Observable<any> {
    return this._cart.patch(`${this.commonUrl}editCart/${cartItemId}`, data);
  }
  clearCart(): Observable<any> {
    const cartRequest = this._cart.delete(`${this.commonUrl}clearCart`);
    cartRequest.subscribe((res: any) => {
      this.cartData = [];
      this.cartCount = 0;
      this.totalPrice = 0;
    });
    return cartRequest;
  }
}
