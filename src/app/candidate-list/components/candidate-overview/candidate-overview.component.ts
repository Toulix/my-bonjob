import { CandidateListService } from './../../services/candidate-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-overview',
  templateUrl: './candidate-overview.component.html',
  styleUrls: ['./candidate-overview.component.scss']
})
export class CandidateOverviewComponent implements OnInit {

  constructor(private candidateListService: CandidateListService) { }

  ngOnInit(): void {

  }

}
