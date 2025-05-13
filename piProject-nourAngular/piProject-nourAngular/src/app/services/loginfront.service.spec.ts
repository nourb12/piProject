import { TestBed } from '@angular/core/testing';

import { LoginfrontService } from './loginfront.service';

describe('LoginfrontService', () => {
  let service: LoginfrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginfrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
