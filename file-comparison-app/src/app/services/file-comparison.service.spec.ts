/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileComparisonService } from './file-comparison.service';

describe('Service: FileComparison', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileComparisonService]
    });
  });

  it('should ...', inject([FileComparisonService], (service: FileComparisonService) => {
    expect(service).toBeTruthy();
  }));
});
