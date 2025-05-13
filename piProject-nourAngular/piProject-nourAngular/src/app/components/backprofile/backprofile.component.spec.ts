import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackprofileComponent } from './backprofile.component';

describe('BackprofileComponent', () => {
  let component: BackprofileComponent;
  let fixture: ComponentFixture<BackprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackprofileComponent]
    });
    fixture = TestBed.createComponent(BackprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
