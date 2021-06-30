import { ApplyOfferService } from './../../../../../services/apply-offer.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferService } from 'src/app/shared/services/offers.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Offer } from 'src/app/core/models/offer';
import { Toast } from 'bootstrap';

interface OfferDetail {
  offer: Offer
}

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offerDetail$: Observable<OfferDetail>;

  isApplying: boolean = false;
  haveApplied: boolean = false;

  @ViewChild("userToast") userToast: ElementRef<HTMLElement>
  toast: Toast;



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
    this.isApplying = true;
    this.applyOfferService
      .postOne(offerId)
      .subscribe(
        (result) => {
          this.isApplying = false;
          this.haveApplied = true;
          this.toast.show();
          console.log(result);
        },
        (error) => {
          console.log("error ", error);
          this.isApplying = false;
        }
      )
  }


  ngAfterViewInit() {
    this.toast = new Toast(this.userToast.nativeElement);
  }

  onShowToast() { //output event
    this.toast.show();
  }




}
