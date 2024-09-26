import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileComparisonService } from './file-comparison.service'; // Adjust the path as necessary
import { environment } from '../../environment/environement'; // Adjust the path as necessary

describe('FileComparisonService', () => {
  let service: FileComparisonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileComparisonService],
    });

    service = TestBed.inject(FileComparisonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('compareFiles', () => {
    it('should send a POST request and return the response', () => {
      const mockFormData = new FormData();
      mockFormData.append('file1', new Blob(['file content 1']), 'file1.txt');
      mockFormData.append('file2', new Blob(['file content 2']), 'file2.txt');

      const mockResponse = { success: true, message: 'Files compared successfully' };

      service.compareFiles(mockFormData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(`${environment.apiURL}/POST/compare`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse); // Simulate server response
    });

    it('should handle error response from the server', () => {
      const mockFormData = new FormData();
      const errorMessage = 'Server error';
    
      service.compareFiles(mockFormData).subscribe({
        next: () => fail('should have failed with the 500 error'),
        error: (error) => {
          console.log('Error Message:', error.message); // Optional for debugging
          // Adjust the expectations to reflect the actual error message structure
          expect(error.message).toContain('Server returned code: 500');
          expect(error.message).toContain('error message is:');
          expect(error.message).toContain('Http failure response for http://localhost:3000/POST/compare: 500 Server Error');
        },
      });
    
      const req = httpTestingController.expectOne(`${environment.apiURL}/POST/compare`);
      expect(req.request.method).toBe('POST');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' }); // Simulate server error
    });
    
    
  });
});
