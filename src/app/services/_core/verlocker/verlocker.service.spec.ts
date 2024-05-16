import { TestBed } from '@angular/core/testing';

import { VerlockerService } from './verlocker.service';

describe('VerlockerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerlockerService = TestBed.get(VerlockerService);
    expect(service).toBeTruthy();
  });
});
