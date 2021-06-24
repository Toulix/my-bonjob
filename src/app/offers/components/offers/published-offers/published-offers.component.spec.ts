import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedOffersComponent } from './published-offers.component';

describe('PublishedOffersComponent', () => {
  let component: PublishedOffersComponent;
  let fixture: ComponentFixture<PublishedOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
