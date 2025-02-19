import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationUpdateComponent } from './evaluation-update.component';

describe('EvaluationUpdateComponent', () => {
  let component: EvaluationUpdateComponent;
  let fixture: ComponentFixture<EvaluationUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationUpdateComponent]
    });
    fixture = TestBed.createComponent(EvaluationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
