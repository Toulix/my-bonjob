import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListsComponent } from './candidate-lists.component';

describe('CandidateListsComponent', () => {
  let component: CandidateListsComponent;
  let fixture: ComponentFixture<CandidateListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
