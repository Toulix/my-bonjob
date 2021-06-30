import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateListService } from 'src/app/candidate-list/services/candidate-list.service';
import { CandidateListResponse } from 'src/app/core/models/candidate-list-response';

@Component({
  selector: 'app-candidacies',
  templateUrl: './candidacies.component.html',
  styleUrls: ['./candidacies.component.scss']
})
export class CandidaciesComponent implements OnInit {

  candidateList$: Observable<CandidateListResponse>;

  constructor(private candidateListService: CandidateListService) { }

  ngOnInit(): void {
    this.candidateList$ = this.candidateListService.getAll<CandidateListResponse>()
  }

}
