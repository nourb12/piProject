import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebackComponent } from './sideback.component';

describe('SidebackComponent', () => {
  let component: SidebackComponent;
  let fixture: ComponentFixture<SidebackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebackComponent]
    });
    fixture = TestBed.createComponent(SidebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
