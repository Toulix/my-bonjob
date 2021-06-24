import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/core/models/offer';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent implements OnInit {

  @Input()
  offer: Offer;

  constructor() { }

  ngOnInit(): void {
  }

  animateContent() {

  }

}
