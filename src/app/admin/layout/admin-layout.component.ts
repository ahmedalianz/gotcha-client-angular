import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/providers/services/products.service';
import { UsersService } from 'src/app/providers/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(public _user: UsersService) {}
  ngOnInit(): void {
    if (localStorage.getItem('adminToken')) {
      this._user.showProfile();
    } else {
      this._user.userDataLoading = false;
    }
  }
}
