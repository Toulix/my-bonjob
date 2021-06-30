import { Observable } from 'rxjs';
import { CandidateResponseData } from 'src/app/core/models/candidate-response-data';
import { CandidateListService } from './../../services/candidate-list.service';
import { Component, OnInit } from '@angular/core';
import { CandidateListResponse } from '../../../core/models/candidate-list-response';

@Component({
  selector: 'app-candidate-overview',
  templateUrl: './candidate-overview.component.html',
  styleUrls: ['./candidate-overview.component.scss']
})
export class CandidateOverviewComponent implements OnInit {

  candidateList$: Observable<CandidateListResponse>;

  constructor(private candidateListService: CandidateListService) { }

  ngOnInit(): void {
    this.candidateList$ = this.candidateListService.getAll<CandidateListResponse>()

  }

  //   totalItems: number;

  //   currentPage: number = 1;
  //   pageSize: number = 15
  // //
  //   constructor(private offerService: OfferService) { }

  //   ngOnInit(): void {
  //     this.offers$ = this.offerService.getAll<OffersResponse>()
  //         .pipe(
  //           tap((result: OffersResponse) => {
  //             this.totalItems = result.total;
  //           }),
  //           map((result: OffersResponse) => {
  //             return result.items
  //           })
  //         )


}
