import { TestBed } from '@angular/core/testing';

import { TestSolvingService } from './test-solving.service';

describe('TestSolvingService', () => {
  let service: TestSolvingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSolvingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
