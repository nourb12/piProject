import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipCertificateComponent } from './internship-certificate.component';

describe('InternshipCertificateComponent', () => {
  let component: InternshipCertificateComponent;
  let fixture: ComponentFixture<InternshipCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipCertificateComponent]
    });
    fixture = TestBed.createComponent(InternshipCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
