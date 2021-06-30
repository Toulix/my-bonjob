import { DownloadService } from './../../../../core/services/download.service';
import { Component, Input, OnInit } from '@angular/core';
import { CandidateResponseData } from 'src/app/core/models/candidate-response-data';
import { CandidateListResponse } from 'src/app/candidate-list/models/candidate-list-response';

@Component({
  selector: 'candidates-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  @Input()
  candidateList: CandidateListResponse;

  totalItems: number;

  currentPage: number = 1;
  pageSize: number = 15

  constructor() { }

  ngOnInit(): void {
    console.log("candidate list", this.candidateList);
    this.totalItems = this.candidateList.total;
  }


  handlePageChanged(pageNumber) {
    this.currentPage = pageNumber;
  }

}
