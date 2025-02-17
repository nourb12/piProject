import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntershipoffersComponent } from './intershipoffers.component';

describe('IntershipoffersComponent', () => {
  let component: IntershipoffersComponent;
  let fixture: ComponentFixture<IntershipoffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntershipoffersComponent]
    });
    fixture = TestBed.createComponent(IntershipoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
