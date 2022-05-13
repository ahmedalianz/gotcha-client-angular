import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  brands: string[] = [
    '/assets/images/brands/samsung.webp',
    '/assets/images/brands/puma.webp',
    '/assets/images/brands/pampers.webp',
    '/assets/images/brands/realme.webp',
    '/assets/images/brands/toshiba.webp',
    '/assets/images/brands/addidas.webp',
    '/assets/images/brands/gucci.webp',
    '/assets/images/brands/lenovo.webp',
    '/assets/images/brands/Xiaomi.webp',
    '/assets/images/brands/loreal.webp',
    '/assets/images/brands/lg.webp',
    '/assets/images/brands/huawei.webp',
  ];
  constructor() {}

  ngOnInit(): void {}
}
