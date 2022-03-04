import { TestBed } from '@angular/core/testing';

import { BookDetailsFormService } from './book-details-form.service';

describe('BookDetailsFormServiceService', () => {
  let service: BookDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDetailsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
