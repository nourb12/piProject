import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimelineComponent } from './project-timeline.component';

describe('ProjectTimelineComponent', () => {
  let component: ProjectTimelineComponent;
  let fixture: ComponentFixture<ProjectTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTimelineComponent]
    });
    fixture = TestBed.createComponent(ProjectTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
