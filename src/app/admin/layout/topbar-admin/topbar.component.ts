import { Component, Input, OnInit } from '@angular/core';

import { AdminService } from 'src/app/providers/services/admin.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Input() drawer: any;
  constructor(
    private _auth: UsersService,
    private _admin: AdminService,
    private _router: Router
  ) {}

  ngOnInit(): void {}
  logout(): void {
    this._auth.logOut().subscribe(
      () => {
        localStorage.removeItem('adminToken');
        this._admin.adminAuthed = false;
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        this._router.navigate(['/admin-auth/login']);
      }
    );
  }
}
