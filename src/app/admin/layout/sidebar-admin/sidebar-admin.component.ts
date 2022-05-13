import { Component, Input, OnInit } from '@angular/core';

import { AdminService } from 'src/app/providers/services/admin.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss'],
})
export class SidebarAdminComponent implements OnInit {
  @Input() drawer: any;
  apiURL = environment.apiURL;
  isLoaded = false;
  file: any;
  constructor(public _user: UsersService, private _router: Router) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const data = new FormData();
    data.append('img', this.file, this.file.name);
    this._user.uploadImage(data);
  }
  navigateTo(link: string) {
    this._router.navigateByUrl(link);
    this.drawer.toggle();
  }
}
