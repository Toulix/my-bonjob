import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersListsComponent } from './offers-lists.component';

describe('OffersListsComponent', () => {
  let component: OffersListsComponent;
  let fixture: ComponentFixture<OffersListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
