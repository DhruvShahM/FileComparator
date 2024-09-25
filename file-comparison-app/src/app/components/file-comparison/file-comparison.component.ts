import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileComparisonService } from '../../services/file-comparison.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-file-comparison',
  templateUrl: './file-comparison.component.html',
  styleUrls: ['./file-comparison.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
})
export class FileComparisonComponent {
  fileForm: FormGroup;
  allowedExtensions = ['txt', 'csv', 'json', 'docx'];
  comparisonResult: any = null;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private comparisonService: FileComparisonService,
    private snackBar: MatSnackBar,
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
            duration: 2000, // duration in milliseconds
          },
        );
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 2000// duration in milliseconds
        });
        this.comparisonResult = null;
      },
    });
  }
}
