import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/providers/services/products.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['../create-category/create-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  public categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subCategories: new FormArray([]),
  });

  constructor(
    private MatDialogRef: MatDialogRef<EditCategoryComponent>,
    private _products: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    const category = this._products.categories.find(
      (category) => category._id === this.data.categoryId
    );
    if (category) this.categoryForm.patchValue(category);
    category?.subCategories.forEach((subCategory: { name: string }, i) => {
      this.subCategories.push(new FormControl(subCategory.name));
    });
  }
  get name() {
    return this.categoryForm.get('name');
  }
  get subCategories() {
    return this.categoryForm.get('subCategories') as FormArray;
  }
  addCategory() {
    this.subCategories.push(new FormControl(''));
  }
  removeCategory(index: number) {
    this.subCategories.removeAt(index);
  }
  editCategory(): void {
    if (this.name) {
      let editedCategories = {
        name: this.name.value,
        subCategories: this.subCategories.value.map((category: string) => {
          return { name: category };
        }),
      };
      this._products
        .editCategory(this.data.categoryId, editedCategories)
        .subscribe(
          () => {
            this._products.getAllCategories();
            this.MatDialogRef.close();
          },
          (err) => console.log(err)
        );
    }
  }
  closeDialouge(): void {
    this.MatDialogRef.close();
  }
}
