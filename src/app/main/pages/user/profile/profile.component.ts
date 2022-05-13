import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  apiURL = environment.apiURL;
  file: any;
  public isSubmittedEditPassword = false;
  public passwordMatch: boolean = true;

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
  });
  securityForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
  });
  serverErrMsg: any = {
    password: '',
  };

  constructor(public _user: UsersService, private _snackbar: MatSnackBar) {}

  get phone() {
    return this.profileForm.get('phone');
  }
  get password() {
    return this.securityForm.get('password');
  }
  get confirm_password() {
    return this.securityForm.get('confirm_password');
  }
  get new_password() {
    return this.securityForm.get('new_password');
  }
  ngOnInit(): void {
    this.profileForm.patchValue(this._user.userData);
  }
  handleEditProfile() {
    this._user.editProfile(this.profileForm.value).subscribe(
      () => {
        this._user.showProfile();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleEditPassword() {
    this.isSubmittedEditPassword = true;
    if (
      this.securityForm.value.password ===
      this.securityForm.value.confirm_password
    ) {
      this._user
        .editPassword(
          this.securityForm.value.password,
          this.securityForm.value.new_password
        )
        .subscribe(
          (res) => {
            this.isSubmittedEditPassword = false;
            this._snackbar.open('Password changed successfully', '', {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['green-snackbar'],
            });
          },
          (err) => {
            this.isSubmittedEditPassword = false;
            this.serverErrMsg.password = err.error.message.password;
            console.log(this.serverErrMsg, err);
          },
          () => {
            this.securityForm.reset();
          }
        );
    } else {
      this.passwordMatch = false;
    }
  }
  handleChange(event: any) {
    this.file = event.target.files[0];
  }
  uploadImage() {
    const data = new FormData();
    data.append('img', this.file, this.file.name);
    this._user.uploadImage(data).subscribe(
      (data) => {
        console.log(data);
        this._user.userData.profilePic = data.data;
      },
      (err) => console.log(err),
      () => {
        console.log('done');
      }
    );
  }
}
