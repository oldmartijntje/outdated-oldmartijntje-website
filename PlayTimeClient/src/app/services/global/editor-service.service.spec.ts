import { TestBed } from '@angular/core/testing';

import { EditorServiceService } from './editor-service.service';

describe('EditorServiceService', () => {
  let service: EditorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
