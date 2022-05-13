import { Component, OnInit } from '@angular/core';

import { OrdersService } from 'src/app/providers/services/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  apiURL = environment.apiURL;

  constructor(public _orders: OrdersService) {}

  ngOnInit(): void {
    this._orders.getMyOrders();
  }
}
