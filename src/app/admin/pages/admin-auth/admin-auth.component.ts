import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminService } from 'src/app/providers/services/admin.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss'],
})
export class AdminAuthComponent implements OnInit {
  public serverErrMsg: { email: string; password: string } = {
    email: '',
    password: '',
  };
  public passwordMatch: boolean = true;
  public isSubmittedLogin = false;
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private _auth: UsersService,
    private _admin: AdminService,
    private _router: Router
  ) {}

  ngOnInit(): void {}
  get loginEmail() {
    return this.loginForm.get('email');
  }
  get loginPassword() {
    return this.loginForm.get('password');
  }

  login(): void {
    this.isSubmittedLogin = true;
    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem('adminToken', res.data.token);
        },
        (err) => {
          this.serverErrMsg.email = err.error.message.email;
          this.serverErrMsg.password = err.error.message.password;
          console.log(err);
        },
        () => {
          this._auth.showProfile().subscribe(
            () => {
              this._router.navigateByUrl('/admin');
            },
            (err: any) => {
              console.log(err);
              this.isSubmittedLogin = false;
            }
          );
        }
      );
    } else {
      console.log('not valid');
    }
  }
}
