import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate';


@Component({
  selector: 'single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss']
})
export class SingleCandidateComponent implements OnInit {

  @Input()
  candidate: Candidate;

  defaultUserProfil: string = "/assets/images/default_candidate_profil.png";

  constructor() { }

  ngOnInit(): void {
    console.log(this.candidate);

  }

}
