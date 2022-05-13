import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent implements OnInit {
  @Input() slides: string[] = [];
  @Input() height: string = '';
  constructor() {}

  ngOnInit(): void {}
}
