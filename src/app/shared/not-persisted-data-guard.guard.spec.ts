import { TestBed } from '@angular/core/testing';

import { NotPersistedDataGuardGuard } from './not-persisted-data-guard.guard';

describe('NotPersistedDataGuardGuard', () => {
  let guard: NotPersistedDataGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotPersistedDataGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
