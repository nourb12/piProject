import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorlegendsComponent } from './colorlegends.component';

describe('ColorlegendsComponent', () => {
  let component: ColorlegendsComponent;
  let fixture: ComponentFixture<ColorlegendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorlegendsComponent]
    });
    fixture = TestBed.createComponent(ColorlegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
