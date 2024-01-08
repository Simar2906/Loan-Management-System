import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApplicationsComponent } from './pending-applications.component';

describe('PendingApplicationsComponent', () => {
  let component: PendingApplicationsComponent;
  let fixture: ComponentFixture<PendingApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingApplicationsComponent]
    });
    fixture = TestBed.createComponent(PendingApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
