import { TestBed } from '@angular/core/testing';

import { ProfilebackService } from './profileback.service';

describe('ProfilebackService', () => {
  let service: ProfilebackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilebackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
