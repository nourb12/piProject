import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOffersComponent } from './dashboard-offers.component';

describe('DashboardOffersComponent', () => {
  let component: DashboardOffersComponent;
  let fixture: ComponentFixture<DashboardOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOffersComponent]
    });
    fixture = TestBed.createComponent(DashboardOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
