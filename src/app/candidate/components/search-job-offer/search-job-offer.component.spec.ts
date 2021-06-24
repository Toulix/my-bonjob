import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobOfferComponent } from './search-job-offer.component';

describe('SearchJobOfferComponent', () => {
  let component: SearchJobOfferComponent;
  let fixture: ComponentFixture<SearchJobOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJobOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
