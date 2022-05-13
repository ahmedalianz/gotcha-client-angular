import { Category } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/product';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private commonUrl = `${environment.apiURL}products/`;
  public categories: Category[] = [];
  public categoriesLoaded: boolean = false;
  constructor(private _products: HttpClient) {}
  getProductsByPage(page: number): Observable<any> {
    return this._products.get(`${this.commonUrl}getProductsByPage/${page}`);
  }
  getProductsByCategory(categoryName: string): Observable<any> {
    return this._products.get(
      `${this.commonUrl}getProductsByCategory/${categoryName}`
    );
  }
  getSingleProduct(productId: string): Observable<any> {
    return this._products.get(`${this.commonUrl}singleProduct/${productId}`);
  }
  removeProduct(productId: string): Observable<any> {
    return this._products.delete(`${this.commonUrl}delProduct/${productId}`);
  }
  addProduct(product: any): Observable<any> {
    return this._products.post(`${this.commonUrl}addProduct/`, product);
  }
  editProduct(
    product: any,
    productId: any,
    deletedImages: string[]
  ): Observable<any> {
    return this._products.patch(`${this.commonUrl}editProduct/${productId}`, {
      product,
      deletedImages,
    });
  }
  uploadImage(data: any, productId: any) {
    return this._products.patch(
      `${this.commonUrl}uploadImage/${productId}`,
      data
    );
  }
  uploadImages(data: any, productId: any) {
    return this._products.patch(
      `${this.commonUrl}uploadImages/${productId}`,
      data
    );
  }
  addReview(addedReview: Review): Observable<any> {
    return this._products.post(`${this.commonUrl}addReview`, addedReview);
  }
  getReviews(productId: string): Observable<any> {
    return this._products.get(`${this.commonUrl}getReviews/${productId}`);
  }
  addCategory(addedCategory: any): Observable<any> {
    return this._products.post(`${this.commonUrl}addCategory`, addedCategory);
  }
  editCategory(categoryId: string, editedCategory: any): Observable<any> {
    return this._products.patch(
      `${this.commonUrl}editCategory/${categoryId}`,
      editedCategory
    );
  }
  deleteCategory(categoryId: string): Observable<any> {
    return this._products.delete(`${this.commonUrl}delCategory/${categoryId}`);
  }
  getAllCategories(): Observable<any> {
    const categoriesRequest = this._products.get(
      `${this.commonUrl}getAllCategories`
    );
    categoriesRequest.subscribe(
      (res: any) => {
        this.categories = res.data;
        this.categoriesLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
    return categoriesRequest;
  }
}
