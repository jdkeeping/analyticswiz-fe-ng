import { TestBed } from '@angular/core/testing';

import { UserDeviceService } from './user-device.service';

describe('UserDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDeviceService = TestBed.get(UserDeviceService);
    expect(service).toBeTruthy();
  });
});
