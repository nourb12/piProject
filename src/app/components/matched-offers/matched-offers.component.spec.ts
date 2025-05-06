import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedOffersComponent } from './matched-offers.component';

describe('MatchedOffersComponent', () => {
  let component: MatchedOffersComponent;
  let fixture: ComponentFixture<MatchedOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchedOffersComponent]
    });
    fixture = TestBed.createComponent(MatchedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
