import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public main_slides: string[] = [
    'assets/images/mainSlider/slide1.png',
    'assets/images/mainSlider/slide3.png',
    'assets/images/mainSlider/slide5.jpg',
    'assets/images/mainSlider/slide2.png',
    'assets/images/mainSlider/slide6.jpg',
    'assets/images/mainSlider/slide4.jpg',
    'assets/images/mainSlider/slide7.jpg',
  ];
  public sub_slides: string[] = [
    'assets/images/mainSlider/slide8.jpg',
    'assets/images/mainSlider/slide9.jpg',
    'assets/images/mainSlider/slide10.jpg',
  ];
  constructor() {}

  ngOnInit(): void {}
}
