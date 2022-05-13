import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/providers/services/products.service';

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrls: ['./nav-categories.component.scss'],
})
export class NavCategoriesComponent implements OnInit {
  categories: Category[] = [];
  sub_categories: any[] = [];

  constructor(public _products: ProductsService) {}

  ngOnInit(): void {
    this.categories = this._products.categories.filter(
      (category) => category.name !== 'Main'
    );
    this.sub_categories = this.categories[0].subCategories;
  }
  setSubCategories(category: Category) {
    this.sub_categories = category.subCategories;
  }
}
