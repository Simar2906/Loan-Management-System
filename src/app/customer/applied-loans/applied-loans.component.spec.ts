import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedLoansComponent } from './applied-loans.component';

describe('AppliedLoansComponent', () => {
  let component: AppliedLoansComponent;
  let fixture: ComponentFixture<AppliedLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedLoansComponent]
    });
    fixture = TestBed.createComponent(AppliedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
