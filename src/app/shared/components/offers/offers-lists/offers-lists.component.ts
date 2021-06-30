import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Offer } from 'src/app/core/models/offer';
import { OfferService } from 'src/app/shared/services/offers.service';


export interface OffersResponse {
  total: number;
  items: Offer[]
}



@Component({
  selector: 'app-offers-lists',
  templateUrl: './offers-lists.component.html',
  styleUrls: ['./offers-lists.component.scss']
})
export class OffersListsComponent implements OnInit {

  offers$: Observable<Offer[]> = null;
  totalItems: number;

  currentPage: number = 1;
  pageSize: number = 15
  //
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offers$ = this.offerService.getAll<OffersResponse>()
      .pipe(
        tap((result: OffersResponse) => {
          this.totalItems = result.total;
        }),
        map((result: OffersResponse) => {
          return result.items
        })
      )

  }

  handlePageChanged(pageNumber: number) {
    this.currentPage = pageNumber;
  }

}
