import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss']
})
export class CandidateSearchComponent implements OnInit {
  searchForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initSearchForm()
  }
  initSearchForm() {
    this.searchForm = this.fb.group({
      keyword: [''],
      city: [''],
      proximity: ['']
    })
  }

}
