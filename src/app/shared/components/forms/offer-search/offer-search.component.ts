import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.scss']
})
export class OfferSearchComponent implements OnInit {

  searchForm: FormGroup;

  // @ViewChild("candidateModal") candidateModal: ElementRef<HTMLElement>
  // modal: Modal;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initSearchForm()
  }

  // ngAfterViewInit() {
  //   this.modal = new Modal(this.candidateModal.nativeElement, {
  //     backdrop: true
  //   })
  // }


  // launchModal() {
  //   this.modal.show();
  // }

  initSearchForm() {
    this.searchForm = this.fb.group({
      keyword: [''],
      city: [''],
      proximity: ['']
    })
  }

}
