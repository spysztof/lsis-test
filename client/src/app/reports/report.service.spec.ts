import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { ReportService } from './report.service';
import { HttpClientMock } from '../shared/test-mocks/mocks';


describe('ReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[{provide: HttpClient, useValue: HttpClientMock}]
  }));

  it('should be created', () => {
    const service: ReportService = TestBed.get(ReportService);
    expect(service).toBeTruthy();
  });
});
