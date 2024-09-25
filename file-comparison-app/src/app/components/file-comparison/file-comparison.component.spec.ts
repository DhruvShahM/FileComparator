/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileComparisonComponent } from './file-comparison.component';

describe('FileComparisonComponent', () => {
  let component: FileComparisonComponent;
  let fixture: ComponentFixture<FileComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileComparisonComponent],
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
