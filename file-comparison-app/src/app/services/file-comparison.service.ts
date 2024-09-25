import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment/environement';

@Injectable({
  providedIn: 'root',
})
export class FileComparisonService {
  private compareEndpoint = '/POST/compare'; // Update the API endpoint here
  private apiEndpoint = environment.apiURL;

  constructor(private http: HttpClient) {}

  compareFiles(formData: FormData): Observable<any> {
    const path = `${this.apiEndpoint}${this.compareEndpoint}`;
    return this.http
      .post<any>(path, formData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
