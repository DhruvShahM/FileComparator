import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileComparisonComponent } from './components/file-comparison/file-comparison.component';
import { HttpClientModule } from '@angular/common/http';
import { FileComparisonService } from './services/file-comparison.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FileComparisonComponent,HttpClientModule,CommonModule],
  providers:[FileComparisonService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-comparison-app';
}
