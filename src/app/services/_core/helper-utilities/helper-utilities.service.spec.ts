import { TestBed } from '@angular/core/testing';

import { HelperUtilitiesService } from './helper-utilities.service';

describe('HelperUtilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelperUtilitiesService = TestBed.get(HelperUtilitiesService);
    expect(service).toBeTruthy();
  });
});
