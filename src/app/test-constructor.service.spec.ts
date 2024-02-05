import { TestBed } from '@angular/core/testing';

import { TestConstructorService } from './test-constructor.service';

describe('TestConstructorService', () => {
  let service: TestConstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestConstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
