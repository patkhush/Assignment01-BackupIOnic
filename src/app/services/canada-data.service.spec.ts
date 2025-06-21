import { TestBed } from '@angular/core/testing';

import { CanadaDataService } from './canada-data.service';

describe('CanadaDataService', () => {
  let service: CanadaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanadaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
