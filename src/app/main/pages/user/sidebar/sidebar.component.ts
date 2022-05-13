import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  apiURL = environment.apiURL;

  constructor(public _auth: UsersService, private _router: Router) {}

  ngOnInit(): void {}
  logout(): void {
    this._auth.logOut();
  }
}
