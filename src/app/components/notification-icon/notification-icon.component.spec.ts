import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationIconComponent } from './notification-icon.component';

describe('NotificationIconComponent', () => {
  let component: NotificationIconComponent;
  let fixture: ComponentFixture<NotificationIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationIconComponent]
    });
    fixture = TestBed.createComponent(NotificationIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
