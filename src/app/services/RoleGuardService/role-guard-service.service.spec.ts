import { TestBed } from '@angular/core/testing';

import { RoleGuardServiceService } from './role-guard-service.service';

describe('RoleGuardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleGuardServiceService = TestBed.get(RoleGuardServiceService);
    expect(service).toBeTruthy();
  });
});
