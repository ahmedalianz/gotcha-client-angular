import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/providers/services/products.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  public categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subCategories: new FormArray([]),
  });
  constructor(
    private MatDialogRef: MatDialogRef<CreateCategoryComponent>,
    private _products: ProductsService
  ) {}

  ngOnInit(): void {}
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
  closeDialouge(): void {
    this.MatDialogRef.close();
  }

  createCategory(): void {
    if (this.name) {
      let addedCategory = {
        name: this.name.value,
        subCategories: this.subCategories.value.map((category: string) => {
          return { name: category };
        }),
      };
      this._products.addCategory(addedCategory).subscribe(
        () => {
          this._products.getAllCategories();
          this.MatDialogRef.close();
        },
        (err) => console.log(err)
      );
    }
  }
}
