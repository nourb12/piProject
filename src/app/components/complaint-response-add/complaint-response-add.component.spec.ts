import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintResponseAddComponent } from './complaint-response-add.component';

describe('ComplaintResponseAddComponent', () => {
  let component: ComplaintResponseAddComponent;
  let fixture: ComponentFixture<ComplaintResponseAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintResponseAddComponent]
    });
    fixture = TestBed.createComponent(ComplaintResponseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
