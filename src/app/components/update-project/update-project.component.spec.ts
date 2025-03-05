import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdateComponent } from './update-project.component';

describe('UpdateProjectComponent', () => {
  let component: ProjectUpdateComponent;
  let fixture: ComponentFixture<ProjectUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectUpdateComponent]
    });
    fixture = TestBed.createComponent(ProjectUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
