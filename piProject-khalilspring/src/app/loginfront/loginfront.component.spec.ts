import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfrontComponent } from './loginfront.component';

describe('LoginfrontComponent', () => {
  let component: LoginfrontComponent;
  let fixture: ComponentFixture<LoginfrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginfrontComponent]
    });
    fixture = TestBed.createComponent(LoginfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
