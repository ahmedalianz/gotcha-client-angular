import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';
import { CreateCategoryComponent } from '../../components/create-category/create-category.component';
import { DeleteCategoryComponent } from '../../components/delete-category/delete-category.component';
import { EditCategoryComponent } from '../../components/edit-category/edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/providers/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsAdminComponent implements OnInit {
  isLoaded = false;
  products: Product[] = [];
  apiURL = environment.apiURL;
  page = 1;
  dataSource: any;
  columns = [
    {
      columnDef: 'shortName',
      header: 'Name',
      cell: (element: any) => `${element.shortName}`,
    },

    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: any) => `${element.price}`,
    },
    {
      columnDef: 'quantity',
      header: 'quantity',
      cell: (element: any) => `${element.inventoryQuantity}`,
    },
  ];
  displayedColumns: string[] = [
    ...this.columns.map((c) => c.columnDef),
    'image',
    'actions',
  ];
  constructor(public _products: ProductsService, private _dialoug: MatDialog) {}

  ngOnInit(): void {
    this.getProductsByPage();
    this.getAllCategories();
  }
  getProductsByPage() {
    this._products.getProductsByPage(this.page).subscribe(
      (data) => {
        this.products = data.data;
        this.isLoaded = true;
      },
      (error) => console.log(error),
      () => {
        this.dataSource = new MatTableDataSource(this.products);
      }
    );
  }
  getAllCategories() {
    this._products.getAllCategories();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeProduct(id: any) {
    this._products.removeProduct(id).subscribe(
      () => {
        this.products = this.products.filter((p) => p._id != id);
      },
      (error) => console.log(error),
      () => {
        this.dataSource = new MatTableDataSource(this.products);
      }
    );
  }
  pagination(pageChange: number) {
    this.page = this.page + pageChange;
    this._products.getProductsByPage(this.page).subscribe(
      (data) => {
        this.products = data.data;
      },
      (err) => console.log(err),
      () => {
        this.dataSource = new MatTableDataSource(this.products);
      }
    );
  }
  createCategoryConfirmation() {
    this._dialoug.open(CreateCategoryComponent);
  }
  deleteCategoryConfirmation(categoryId: string) {
    this._dialoug.open(DeleteCategoryComponent, {
      data: {
        categoryId,
      },
    });
  }
  editCategoryConfirmation(categoryId: string) {
    this._dialoug.open(EditCategoryComponent, {
      data: {
        categoryId,
      },
    });
  }
}
