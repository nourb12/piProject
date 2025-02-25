import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternshipOffersComponent } from './internship-offers.component';


describe('IntershipoffersComponent', () => {
  let component: InternshipOffersComponent;
  let fixture: ComponentFixture<InternshipOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipOffersComponent]
    });
    fixture = TestBed.createComponent(InternshipOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
