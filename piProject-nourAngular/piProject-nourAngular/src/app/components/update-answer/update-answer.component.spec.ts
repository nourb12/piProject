import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnswerComponent } from './update-answer.component';

describe('UpdateAnswerComponent', () => {
  let component: UpdateAnswerComponent;
  let fixture: ComponentFixture<UpdateAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAnswerComponent]
    });
    fixture = TestBed.createComponent(UpdateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
