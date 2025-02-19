import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationAddComponent } from './evaluation-add.component';

describe('EvaluationAddComponent', () => {
  let component: EvaluationAddComponent;
  let fixture: ComponentFixture<EvaluationAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationAddComponent]
    });
    fixture = TestBed.createComponent(EvaluationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
