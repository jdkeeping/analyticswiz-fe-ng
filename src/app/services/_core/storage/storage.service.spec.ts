import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('SecureStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});
