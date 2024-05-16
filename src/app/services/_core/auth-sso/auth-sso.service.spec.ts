import { TestBed } from '@angular/core/testing';

import { AuthSsoService } from './auth-sso.service';

describe('AuthSsoService', () => {
  let service: AuthSsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
