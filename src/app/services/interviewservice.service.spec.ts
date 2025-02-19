import { TestBed } from '@angular/core/testing';

import { InterviewserviceService } from './interviewservice.service';

describe('InterviewserviceService', () => {
  let service: InterviewserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
