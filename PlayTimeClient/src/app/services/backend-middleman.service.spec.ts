import { TestBed } from '@angular/core/testing';

import { BackendMiddlemanService } from './backend-middleman.service';

describe('BackendMiddlemanService', () => {
  let service: BackendMiddlemanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendMiddlemanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
