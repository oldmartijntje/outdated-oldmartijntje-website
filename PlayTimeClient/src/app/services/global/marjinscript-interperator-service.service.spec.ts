import { TestBed } from '@angular/core/testing';

import { MarjinscriptInterperatorServiceService } from './marjinscript-interperator-service.service';

describe('MarjinscriptInterperatorServiceService', () => {
  let service: MarjinscriptInterperatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarjinscriptInterperatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
