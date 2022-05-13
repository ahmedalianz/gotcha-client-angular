import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/providers/services/cart.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public search: string = '';
  constructor(
    public _router: Router,
    public _auth: UsersService,
    public _cart: CartService
  ) {}
  ngOnInit() {}
  logout() {
    this._auth.logOut();
  }
}
