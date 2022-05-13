import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/providers/services/products.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css'],
})
export class DeleteCategoryComponent implements OnInit {
  constructor(
    private _products: ProductsService,
    private MatDialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { categoryId: string }
  ) {}

  ngOnInit(): void {}
  deleteCategory() {
    this._products.deleteCategory(this.data.categoryId).subscribe(
      () => {
        this._products.getAllCategories();
        this.MatDialogRef.close();
      },
      (err) => console.log(err)
    );
  }
}
