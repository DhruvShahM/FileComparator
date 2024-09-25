/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { FileComparisonService } from '../../services/file-comparison.service';
import { FileComparisonComponent } from './file-comparison.component';

describe('FileComparisonComponent', () => {
  let component: FileComparisonComponent;
  let fixture: ComponentFixture<FileComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FileComparisonComponent, HttpClientModule],
      providers: [FileComparisonService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
