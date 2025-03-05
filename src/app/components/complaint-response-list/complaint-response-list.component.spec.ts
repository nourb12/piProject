import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintResponseListComponent } from './complaint-response-list.component';

describe('ComplaintResponseListComponent', () => {
  let component: ComplaintResponseListComponent;
  let fixture: ComponentFixture<ComplaintResponseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintResponseListComponent]
    });
    fixture = TestBed.createComponent(ComplaintResponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
