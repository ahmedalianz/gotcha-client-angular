import { Category, SubCategory } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/providers/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  isSubmitted: boolean = false;
  file: any;
  data = new FormData();
  imageSrc: string = '';
  files: any;
  multiData = new FormData();
  multiImageSrc: string[] = [];
  sizesList: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  categoryMainList: Category[] = [];
  categorySubList: SubCategory[] = [];
  newProductForm = new FormGroup({
    shortName: new FormControl('', [
      Validators.required,
      Validators.maxLength(35),
    ]),
    longName: new FormControl('', [Validators.required]),
    brand: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    keywords: new FormArray([]),
    colors: new FormArray([]),
    sizes: new FormArray([]),
    main_category: new FormControl('', [Validators.required]),
    categories: new FormArray([]),
    inventoryQuantity: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    specifications: new FormControl(''),
    discount: new FormGroup({
      percentage: new FormControl(0),
      active: new FormControl(false),
    }),
    bestSeller: new FormControl(false),
    kidsSizes: new FormControl(false),
  });
  constructor(private _products: ProductsService, private _router: Router) {}
  ngOnInit(): void {
    if (!this._products.categoriesLoaded) {
      this._products.getAllCategories().subscribe((res) => {
        this.categoryMainList = res.data;
        this._products.categories = res.data;
        this._products.categoriesLoaded = true;
      });
    } else {
      this.categoryMainList = this._products.categories;
    }
  }
  get shortName() {
    return this.newProductForm.get('shortName');
  }
  get longName() {
    return this.newProductForm.get('longName');
  }
  get price() {
    return this.newProductForm.get('price');
  }
  get active() {
    return this.newProductForm.get('discount')?.get('active');
  }
  get bestSeller() {
    return this.newProductForm.get('bestSeller');
  }
  get inventoryQuantity() {
    return this.newProductForm.get('inventoryQuantity');
  }
  get keywords() {
    return this.newProductForm.get('keywords') as FormArray;
  }
  get colors() {
    return this.newProductForm.get('colors') as FormArray;
  }
  get sizes() {
    return this.newProductForm.get('sizes') as FormArray;
  }
  get main_category() {
    return this.newProductForm.get('main_category');
  }
  get categories() {
    return this.newProductForm.get('categories') as FormArray;
  }
  setSizes(event: any) {
    if (event.checked) {
      this.sizesList = [
        '1 Year',
        '2 Years',
        '3 Years',
        '4 Years',
        '5 Years',
        '6 Years',
        '7 Years',
        '8 Years',
        '9 Years',
        '10 Years',
        '11 Years',
        '12 Years',
        '13 Years',
        '14 Years',
      ];
    } else {
      this.sizesList = ['S', 'M', 'L', 'XL', 'XXL'];
    }
  }
  uploadImage(data: any, productId?: number): void {
    this._products.uploadImage(data, productId).subscribe(
      (data) => {},
      (err) => {
        console.log('err', err);
      },
      () => {
        this._router.navigate(['/admin/products']);
      }
    );
  }
  uploadImages(data: any, productId?: number): void {
    this._products.uploadImages(data, productId).subscribe(
      (data) => {},
      (err) => {
        console.log('err', err);
      },
      () => {
        this._router.navigate(['/admin/products']);
      }
    );
  }
  onFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.data.append('img', this.file, this.file.name);
      };
    }
  }
  onMultiFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.files = event.target.files;
      for (let i = 0; i < this.files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.multiImageSrc.push(reader.result as string);
          this.multiData.append(`images`, this.files[i], this.files[i].name);
        };
        reader.readAsDataURL(this.files[i]);
      }
    }
  }

  addKeyword(): void {
    const keyword = new FormControl('');
    this.keywords.push(keyword);
  }
  removeKeyword(i: number): void {
    this.keywords.removeAt(i);
  }
  addColor(): void {
    const color = new FormControl('#000');
    this.colors.push(color);
  }
  removeColor(i: number): void {
    this.colors.removeAt(i);
  }
  addSize(i: number): void {
    const tmpSizes = this.sizes.controls.map((size) => size.value);
    const exist = tmpSizes.find((contorl) => contorl === this.sizesList[i]);
    if (exist) {
      const index = tmpSizes.indexOf(exist);
      this.sizes.removeAt(index);
    } else {
      const size = new FormControl(this.sizesList[i]);
      this.sizes.push(size);
    }
  }
  setSubCategories(): void {
    if (this.main_category)
      this.categorySubList = [
        ...this._products.categories
          .filter((category) => category.name === this.main_category?.value)
          .map((category) => category.subCategories),
      ].flat();
  }
  addSubCategory(i: number): void {
    const tmpCategorys = this.categories.controls.map(
      (category) => category.value
    );
    const exist = tmpCategorys.find(
      (contorl) => contorl.name === this.categorySubList[i].name
    );
    if (exist) {
      const index = tmpCategorys.indexOf(exist);
      this.categories.removeAt(index);
    } else {
      const category = new FormControl(this.categorySubList[i]);
      this.categories.push(category);
    }
  }
  addProduct(): void {
    this.isSubmitted = true;
    this.newProductForm.value.categories = [
      this.main_category?.value,
      ...this.categories.value.map((category: SubCategory) => category.name),
    ];
    if (this.newProductForm.valid) {
      this._products.addProduct(this.newProductForm.value).subscribe(
        (data) => {
          if (this.file) {
            this.uploadImage(this.data, data.data._id);
          } else {
            this._router.navigate(['/admin/products']);
          }
          if (this.files) {
            this.uploadImages(this.multiData, data.data._id);
          } else {
            this._router.navigate(['/admin/products']);
          }
        },
        (err) => {
          console.log(err);
          this.isSubmitted = false;
        },
        () => {
          this.isSubmitted = false;
          this.newProductForm.reset();
        }
      );
    } else {
      this.isSubmitted = false;
    }
  }
}
