import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public adminAuthed = false;
  public adminData!: User;
  private commonUrl = `${environment.apiURL}users/`;
  private commonOrdersUrl = `${environment.apiURL}orders/`;

  constructor(private _auth: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this._auth.get(`${this.commonUrl}showAllUsers`);
  }
  removeUser(userId: any): Observable<any> {
    return this._auth.delete(`${this.commonUrl}deleteUser/${userId}`);
  }
  getAllAdmins(): Observable<any> {
    return this._auth.get(`${this.commonUrl}showAllAdmins`);
  }
  showUser(userId: any): Observable<any> {
    return this._auth.get(`${this.commonUrl}showUser/${userId}`);
  }

  //----------------admin options to control orders ----------------
  allOrdersAdmin(): Observable<any> {
    return this._auth.get(`${this.commonOrdersUrl}allOrdersAdmin`);
  }
  delSingleOrderAdmin(orderId: any): Observable<any> {
    return this._auth.delete(
      `${this.commonOrdersUrl}delSingleOrderAdmin/${orderId}`
    );
  }
  delOrdersAdmin(userId: any): Observable<any> {
    return this._auth.delete(`${this.commonOrdersUrl}delOrdersAdmin/${userId}`);
  }
}
