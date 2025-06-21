import { TestBed } from '@angular/core/testing';

import { OntarioDataService } from './ontario-data.service';

describe('OntarioDataService', () => {
  let service: OntarioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OntarioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
