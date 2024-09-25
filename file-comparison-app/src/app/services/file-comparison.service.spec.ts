/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileComparisonService } from './file-comparison.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: FileComparison', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileComparisonService],
      imports: [HttpClientModule],
    });
  });

  it('should ...', inject(
    [FileComparisonService],
    (service: FileComparisonService) => {
      expect(service).toBeTruthy();
    },
  ));
});
