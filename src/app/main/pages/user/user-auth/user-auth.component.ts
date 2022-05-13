import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent implements OnInit {
  public isSubmittedRegister = false;
  public isSubmittedLogin = false;
  public passwordMatch: boolean = true;
  public adminLogin = false;
  public serverErrMsg: {
    email: string;
    password: string;
    phone: string;
  } = {
    email: '',
    password: '',
    phone: '',
  };
  public registerationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.email,
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    security: new FormGroup({
      securityQuestion: new FormControl('', [Validators.required]),
      securityAnswer: new FormControl('', [Validators.required]),
    }),
    adress: new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
  });
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.registerationForm.get('email');
  }
  get phone() {
    return this.registerationForm.get('phone');
  }
  get passwordLogin() {
    return this.loginForm.get('password');
  }

  get confirm_password() {
    return this.registerationForm.get('confirm_password');
  }
  get emailLogin() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.registerationForm.get('password');
  }
  constructor(private _user: UsersService, private _router: Router) {
    if (window.location.pathname.includes('login')) {
      this.adminLogin = true;
    }
  }

  ngOnInit(): void {}
  signUp(): void {
    this.isSubmittedRegister = true;
    if (this.registerationForm.valid) {
      if (
        this.registerationForm.value.password ===
        this.registerationForm.value.confirm_password
      ) {
        this._user.register(this.registerationForm.value).subscribe(
          (data) => {
            this.isSubmittedRegister = false;
            localStorage.setItem('token', data.data.token);
          },
          (err: any) => {
            this.isSubmittedRegister = false;
            this.serverErrMsg.email = err.error.message.email;
            this.serverErrMsg.password = err.error.message.password;
            console.log(err);
          },
          () => {
            this._user.showProfile().subscribe(
              () => {
                this.registerationForm.reset();
                this._router.navigate(['/']);
              },
              (err: any) => {
                console.log(err);
              }
            );
          }
        );
      } else {
        this.passwordMatch = false;
      }
    }
  }
  login() {
    this.isSubmittedLogin = true;
    if (this.loginForm.valid) {
      this._user.login(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem('token', res.data.token);
        },
        (err) => {
          this.serverErrMsg.email = err.error.message.email;
          this.serverErrMsg.password = err.error.message.password;
          console.log(err);
        },
        () => {
          this._user.showProfile().subscribe(
            (data: any) => {
              this._user.userData = data;
              this.isSubmittedLogin = false;
              this._router.navigate(['/']);
            },
            (err: any) => {
              console.log(err);
              this.isSubmittedLogin = false;
            }
          );
        }
      );
    }
  }
}
