import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartAnimationComponent } from './heart-animation.component';

describe('HeartAnimationComponent', () => {
  let component: HeartAnimationComponent;
  let fixture: ComponentFixture<HeartAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeartAnimationComponent]
    });
    fixture = TestBed.createComponent(HeartAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
