import { TestBed } from '@angular/core/testing';

import { BhAnalyticsService } from './analytics.service';

describe('BhAnalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BhAnalyticsService = TestBed.get(BhAnalyticsService);
    expect(service).toBeTruthy();
  });
});
