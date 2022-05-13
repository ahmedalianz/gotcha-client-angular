import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isAuthed = false;
  public userData!: User;
  public userDataLoading: boolean = true;
  private commonUrl = `${environment.apiURL}users/`;
  constructor(
    private _auth: HttpClient,
    private _products: ProductsService,
    private _router: Router
  ) {}

  register(data: any): Observable<any> {
    return this._auth.post(`${this.commonUrl}register`, data);
  }
  login(data: any): Observable<any> {
    return this._auth.post(`${this.commonUrl}login`, data);
  }
  showProfile(): Observable<any> {
    const userRequest = this._auth.get(`${this.commonUrl}showProfile`);
    userRequest.subscribe(
      (res: any) => {
        this.userData = res.data;
        this.isAuthed = true;
        this._products.getAllCategories().subscribe(
          () => {
            this.userDataLoading = false;
          },
          (err) => {
            this.userDataLoading = false;
            console.log(err);
          }
        );
      },
      (err: any) => {
        console.log(err);
        this.isAuthed = false;
        this.userDataLoading = false;
        localStorage.removeItem('token');
      }
    );
    return userRequest;
  }

  editProfile(userData: any) {
    return this._auth.patch(`${this.commonUrl}editProfile`, userData);
  }
  editPassword(password: any, new_password: any): Observable<any> {
    return this._auth.patch(`${this.commonUrl}editPassword`, {
      password,
      new_password,
    });
  }
  logOut(): Observable<any> {
    const userRequest = this._auth.post(`${this.commonUrl}logout`, null);
    userRequest.subscribe(
      () => {
        this.isAuthed = false;
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
      }
    );
    return userRequest;
  }

  uploadImage(data: any): Observable<any> {
    const userRequest = this._auth.patch(`${this.commonUrl}changeImage`, data);
    userRequest.subscribe(
      (data: any) => {
        this.userData.profilePic = data.data;
      },
      (err) => {
        console.log(err);
      }
    );
    return userRequest;
  }
}
