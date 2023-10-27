import { TestBed } from '@angular/core/testing';

import { ToastQueueService } from './toast-queue.service';

describe('ToastQueueService', () => {
  let service: ToastQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
