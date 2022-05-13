import { ActivatedRoute, Router } from '@angular/router';
import { Category, SubCategory } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/providers/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['../add-product/add-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  isLoaded = false;
  file: any;
  data = new FormData();
  imageSrc: any;
  imageRemoved: boolean = false;
  deltedImages: string[] = [];
  files: any;
  multiData = new FormData();
  multiImageSrc: string[] = [];
  productMainImage!: string | null;
  productmultiImages!: string[] | null;
  productId!: string;
  apiURL = environment.apiURL;
  isSubmitted = false;
  ErrMsg: string = '';
  sizesList: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  categoryMainList: Category[] = [];
  categorySubList: SubCategory[] = [];
  kidsSizes: boolean = false;
  editProductForm = new FormGroup({
    shortName: new FormControl('', [Validators.required]),
    longName: new FormControl('', [Validators.required]),
    brand: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    keywords: new FormArray([]),
    colors: new FormArray([]),
    sizes: new FormArray([]),
    categories: new FormArray([]),
    main_category: new FormControl('', [Validators.required]),
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

  constructor(
    private _products: ProductsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productId = this._route.snapshot.params['productId'];
    this.categoryMainList = this._products.categories;
    this._products.getSingleProduct(this.productId).subscribe(
      (data) => {
        this.editProductForm.patchValue(data.data);
        if (data.data.kidsSizes) {
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
        data.data.keywords.forEach((keyword: string) => {
          this.keywords.push(new FormControl(keyword));
        });
        data.data.colors.forEach((color: string) => {
          this.colors.push(new FormControl(color));
        });
        data.data.sizes.forEach((size: string) => {
          this.sizes.push(new FormControl(size));
        });
        const selectedCategory = data.data.categories.find(
          (category: string) =>
            this.categoryMainList
              .map((cate: Category) => cate.name)
              .indexOf(category) > -1
        );

        data.data.categories.forEach((category: string) => {
          if (category !== selectedCategory)
            this.categories.push(
              new FormGroup({
                name: new FormControl(category),
              })
            );
        });

        if (selectedCategory)
          this.editProductForm.patchValue({
            main_category: selectedCategory,
          });
        this.categorySubList = [
          ...this._products.categories
            .filter((category) => category.name === this.main_category?.value)
            .map((category) => category.subCategories),
        ].flat();
        this.productMainImage = data.data.mainImage;
        this.productmultiImages = data.data.images;
        this.isLoaded = true;
      },
      (err) => {
        console.log(err);
        this._router.navigate(['/admin/products']);
      }
    );
  }
  get shortName() {
    return this.editProductForm.get('shortName');
  }
  get longName() {
    return this.editProductForm.get('longName');
  }
  get price() {
    return this.editProductForm.get('price');
  }
  get active() {
    return this.editProductForm.get('discount')?.get('active');
  }
  get bestSeller() {
    return this.editProductForm.get('bestSeller');
  }
  get inventoryQuantity() {
    return this.editProductForm.get('inventoryQuantity');
  }
  get keywords() {
    return this.editProductForm.get('keywords') as FormArray;
  }
  get colors() {
    return this.editProductForm.get('colors') as FormArray;
  }
  get sizes() {
    return this.editProductForm.get('sizes') as FormArray;
  }
  get main_category() {
    return this.editProductForm.get('main_category');
  }
  get categories() {
    return this.editProductForm.get('categories') as FormArray;
  }
  compareFn(category1: SubCategory, category2: SubCategory) {
    return category1 && category2
      ? category1.name === category2.name
      : category1 === category2;
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
  uploadImage(data: any) {
    this._products.uploadImage(data, this.productId).subscribe(
      () => {
        this._router.navigate(['/admin/products']);
      },
      (err) => {
        console.log('err', err);
        this._snackbar.open('Error uploading image', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
        });
      }
    );
  }
  uploadImages(data: any): void {
    this._products.uploadImages(data, this.productId).subscribe(
      () => {
        this._router.navigate(['/admin/products']);
      },
      (err) => {
        console.log('err', err);
        this._snackbar.open('Error uploading image', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
        });
      }
    );
  }
  onFileSelected(event: any) {
    this.productMainImage = null;
    this.imageRemoved = false;
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
  removeImage() {
    this.productMainImage = null;
    this.imageSrc = null;
    this.imageRemoved = true;
  }
  removeImageByIndex(index: number) {
    this.productmultiImages &&
      this.deltedImages.push(this.productmultiImages[index]);
    const imagesAfterFilter = this.productmultiImages?.filter(
      (image) => this.productmultiImages?.indexOf(image) !== index
    );
    if (imagesAfterFilter) this.productmultiImages = imagesAfterFilter;
    const imagesSrcsAfterFilter = this.multiImageSrc?.filter(
      (image) => this.multiImageSrc?.indexOf(image) !== index
    );
    if (imagesSrcsAfterFilter) this.multiImageSrc = imagesSrcsAfterFilter;
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
  handleEdit() {
    this.isSubmitted = true;
    this.editProductForm.value.categories = [
      this.main_category?.value,
      ...this.categories.value.map((category: SubCategory) => category.name),
      ,
    ];
    if (this.editProductForm.valid) {
      this._products
        .editProduct(
          this.editProductForm.value,
          this.productId,
          this.deltedImages
        )
        .subscribe(
          (res) => {
            if (this.file || this.imageRemoved) this.uploadImage(this.data);
            if (this.files) this.uploadImages(this.multiData);
            this.isSubmitted = false;
            this._router.navigate(['/admin/products']);
          },
          (err) => {
            console.log(err);
            this.isSubmitted = false;
            this._snackbar.open('Server Error', '', {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['red-snackbar'],
            });
          }
        );
    } else {
      this.isSubmitted = false;
      this._snackbar.open('Please fill all required fields', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
      });
    }
  }
}
