import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilebackComponent } from './profileback.component';

describe('ProfilebackComponent', () => {
  let component: ProfilebackComponent;
  let fixture: ComponentFixture<ProfilebackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilebackComponent]
    });
    fixture = TestBed.createComponent(ProfilebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
