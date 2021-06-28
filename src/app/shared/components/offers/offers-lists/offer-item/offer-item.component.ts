import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  animateContent() {

  }

  seeOfferDetail(offer: Offer) {
    const offerId = offer ? offer.id : null;
    this.router.navigate(['/offers', offerId]);
  }

}
