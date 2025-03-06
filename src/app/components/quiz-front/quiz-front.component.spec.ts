import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFrontComponent } from './quiz-front.component';

describe('QuizFrontComponent', () => {
  let component: QuizFrontComponent;
  let fixture: ComponentFixture<QuizFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizFrontComponent]
    });
    fixture = TestBed.createComponent(QuizFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
