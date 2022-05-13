import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private commonUrl = `${environment.apiURL}orders/`;
  public orders: Order[] = [];
  public ordersLoaded: boolean = false;
  constructor(public _orders: HttpClient) {}

  getMyOrders(): Observable<any> {
    const ordersRequest = this._orders.get(`${this.commonUrl}myOrders`);
    ordersRequest.subscribe(
      (res: any) => {
        this.ordersLoaded = true;
        this.orders = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    return ordersRequest;
  }
  placeOrder(data: any): Observable<any> {
    return this._orders.post(`${this.commonUrl}placeOrder`, data);
  }

  editOrder(orderId: string, data: any): Observable<any> {
    return this._orders.patch(`${this.commonUrl}editOrder/${orderId}`, data);
  }

  delOrder(orderId: string): Observable<any> {
    return this._orders.delete(`${this.commonUrl}delOrder/${orderId}`);
  }

  changeOrderStatus(orderId: string, status: string): Observable<any> {
    return this._orders.patch(`${this.commonUrl}changeOrderStatus/${orderId}`, {
      status,
    });
  }

  // outer.delete('/delOrders', auth('User'), orderController.delOrders)
  // router.delete('/delOrder/:orderId', auth('User'), orderController.delOrder)
}
