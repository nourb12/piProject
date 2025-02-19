import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintUpdateComponent } from './complaint-update.component';

describe('ComplaintUpdateComponent', () => {
  let component: ComplaintUpdateComponent;
  let fixture: ComponentFixture<ComplaintUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintUpdateComponent]
    });
    fixture = TestBed.createComponent(ComplaintUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
