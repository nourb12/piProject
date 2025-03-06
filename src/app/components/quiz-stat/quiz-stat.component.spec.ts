import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStatComponent } from './quiz-stat.component';

describe('QuizStatComponent', () => {
  let component: QuizStatComponent;
  let fixture: ComponentFixture<QuizStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizStatComponent]
    });
    fixture = TestBed.createComponent(QuizStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
