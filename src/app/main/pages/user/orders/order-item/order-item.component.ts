import { Component, Input, OnInit } from '@angular/core';

import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/providers/services/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem!: Order;
  @Input() i!: number;
  apiURL = environment.apiURL;
  public expand: boolean = false;
  constructor(private _orders: OrdersService) {}

  ngOnInit(): void {}
  changeOrderStatus(status: string) {
    if (this.orderItem._id)
      this._orders.changeOrderStatus(this.orderItem._id, status).subscribe(
        (res) => {
          this._orders.getMyOrders();
        },
        (err) => console.log(err)
      );
  }
}
