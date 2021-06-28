import { ApplyOfferService } from './../../../../../services/apply-offer.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferService } from 'src/app/shared/services/offers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Offer } from 'src/app/core/models/offer';

interface OfferDetail {
  offer: Offer
}

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit, OnDestroy {

  offerDetail$: Observable<OfferDetail>;
  applyOfferSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private offerService: OfferService,
    private applyOfferService: ApplyOfferService) { }

  ngOnInit(): void {
    this.offerDetail$ = this.activatedRoute.paramMap
      // .subscribe(
      //   paramMap => {
      //     console.log("Id", paramMap.get('id'));
      //   }
      // )
      .pipe(
        switchMap(params => {
          //id inscriptions
          let id = +params.get('id');
          return this.offerService.getOne<OfferDetail>(id);
        })
      )
  }

  apply(offerId: number) {
    this.applyOfferSubscription = this.applyOfferService
      .postOne(offerId)
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log("error ", error);
        }
      )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.applyOfferSubscription.unsubscribe();
  }

}
