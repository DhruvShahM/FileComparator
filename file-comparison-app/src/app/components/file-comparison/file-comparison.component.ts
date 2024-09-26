import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FileComparisonService } from '../../services/file-comparison.service';
@Component({
  selector: 'app-file-comparison',
  templateUrl: './file-comparison.component.html',
  styleUrls: ['./file-comparison.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
})
export class FileComparisonComponent {
  fileForm: FormGroup;
  allowedExtensions = [
    'txt',
    'csv',
    'json',
    'docx',
    'pdf',
    'jpeg',
    'jpg',
    'png',
  ];
  comparisonResult: any = null;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private comparisonService: FileComparisonService,
    public readonly snackBar: MatSnackBar,
  ) {
    this.fileForm = this.fb.group({
      file1: [null, [Validators.required, this.fileValidator.bind(this)]],
      file2: [null, [Validators.required, this.fileValidator.bind(this)]],
    });
  }

  onFileChange(event: any, fileControl: string) {
    const file = event.target.files[0];
    this.fileForm.patchValue({ [fileControl]: file });
  }

  fileValidator(control: any) {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (this.allowedExtensions.indexOf(extension) < 0) {
        return { extension: true };
      }
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.fileForm.invalid) {
      return;
    }

    const file1 = this.fileForm.get('file1')?.value;
    const file2 = this.fileForm.get('file2')?.value;

    const file1Extension = file1.name.split('.').pop()?.toLowerCase();
    const file2Extension = file2.name.split('.').pop()?.toLowerCase();

    if (file1Extension !== file2Extension) {
      this.snackBar.open('File extensions do not match.', 'close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'], // duration in milliseconds
      });
      return; // Return error if extensions don't match
    }

    const formData = new FormData();
    formData.append('files', this.fileForm.get('file1')?.value);
    formData.append('files', this.fileForm.get('file2')?.value);

    this.comparisonService.compareFiles(formData).subscribe({
      next: (response) => {
        this.comparisonResult = response;
        this.snackBar.open(
          response.areSame ? 'Both files are same' : 'Both files are not same',
          'Close',
          {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000, // duration in milliseconds
          },
        );
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.snackBar.open(this.errorMessage, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000, // duration in milliseconds
        });
        this.comparisonResult = null;
      },
    });
  }
}
