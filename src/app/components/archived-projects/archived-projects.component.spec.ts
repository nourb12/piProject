import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProjectsComponent } from './archived-projects.component';

describe('ArchivedProjectsComponent', () => {
  let component: ArchivedProjectsComponent;
  let fixture: ComponentFixture<ArchivedProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedProjectsComponent]
    });
    fixture = TestBed.createComponent(ArchivedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
