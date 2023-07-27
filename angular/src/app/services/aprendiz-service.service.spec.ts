import { TestBed } from '@angular/core/testing';

import { AprendizServiceService } from './aprendiz-service.service';

describe('AprendizServiceService', () => {
  let service: AprendizServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprendizServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
