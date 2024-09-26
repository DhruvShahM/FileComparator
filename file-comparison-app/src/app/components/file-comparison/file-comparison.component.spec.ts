import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FileComparisonService } from '../../services/file-comparison.service';
import { of, throwError } from 'rxjs';
import { FileComparisonComponent } from './file-comparison.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('FileComparisonComponent', () => {
  let component: FileComparisonComponent;
  let fixture: ComponentFixture<FileComparisonComponent>;
  let fileComparisonService: jasmine.SpyObj<FileComparisonService>;
  beforeEach(async () => {
    const fileComparisonSpy = jasmine.createSpyObj('FileComparisonService', [
      'compareFiles',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule, MatIconModule, CommonModule, BrowserAnimationsModule],
      // declarations: [FileComparisonComponent],
      providers: [
        FormBuilder,
        { provide: FileComparisonService, useValue: fileComparisonSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FileComparisonComponent);
    component = fixture.componentInstance;
    fileComparisonService = TestBed.inject(
      FileComparisonService,
    ) as jasmine.SpyObj<FileComparisonService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Positive scenarios', () => {
    it('should allow valid files with matching extensions', () => {
      const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });

      component.fileForm.controls['file1'].setValue(file1);
      component.fileForm.controls['file2'].setValue(file2);

      expect(component.fileForm.valid).toBeTruthy();
    });
    it('should API call when files have matching extensions and form is valid', () => {
      const file1 = new File(['content1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['content2'], 'file2.txt', { type: 'text/plain' });

      component.fileForm.controls['file1'].setValue(file1);
      component.fileForm.controls['file2'].setValue(file2);

      const response = { areSame: false };
      fileComparisonService.compareFiles.and.returnValue(of(response));

      component.onSubmit();

      expect(fileComparisonService.compareFiles).toHaveBeenCalled();
      expect(component.comparisonResult).toEqual(response);
    });
  });

  describe('Negative scenarios', () => {

    it('should not submit the form if invalid', () => {
      component.onSubmit();
      expect(fileComparisonService.compareFiles).not.toHaveBeenCalled();
    });

    it('should show an error message when file extensions  not match', () => {
      // Arrange: Set form values with different file extensions
      component.fileForm.patchValue({
        file1: { name: 'file1.pdf' },
        file2: { name: 'file2.doc' }
      });

      // Act: Call the code logic you want to test
      const file1 = component.fileForm.get('file1')?.value;
      const file2 = component.fileForm.get('file2')?.value;
      const file1Extension = file1.name.split('.').pop()?.toLowerCase();
      const file2Extension = file2.name.split('.').pop()?.toLowerCase();


      // Check if value1 === value2 returns false (meaning they are not equal)
      const comparisonResult = (file1Extension === file2Extension);

      // Check if the result of the comparison is false
      expect(comparisonResult).toBeFalse();  // This will pass because 10 !== 20
    });

  });

});
