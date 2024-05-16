import { TestBed } from '@angular/core/testing';

import { AuthLegacyService } from './auth-legacy.service';

describe('AuthLegacyService', () => {
  let service: AuthLegacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLegacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
