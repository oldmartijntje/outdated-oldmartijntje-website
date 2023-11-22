import { TestBed } from '@angular/core/testing';

import { RuntimeServiceService } from './runtime-service.service';

describe('RuntimeServiceService', () => {
  let service: RuntimeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuntimeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
