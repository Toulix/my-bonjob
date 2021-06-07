import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoBackArrowComponent } from './go-back-arrow.component';

describe('GoBackArrowComponent', () => {
  let component: GoBackArrowComponent;
  let fixture: ComponentFixture<GoBackArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoBackArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoBackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
