import { TestBed, inject } from '@angular/core/testing';

import { ProcessHTTPMsgService } from './process-HTTPMsg.service';

describe('ProcessHttpmsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessHTTPMsgService]
    });
  });

  it('should be created', inject([ProcessHTTPMsgService], (service: ProcessHTTPMsgService) => {
    expect(service).toBeTruthy();
  }));
});
