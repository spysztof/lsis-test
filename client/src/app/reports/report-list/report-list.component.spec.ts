import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReportListComponent } from './report-list.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { ReportService } from '../report.service';
import { ReportServiceMock } from 'src/app/shared/test-mocks/mocks.spec';

describe('ReportListComponent', () => {
  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListComponent, HeaderComponent],
      providers: [{ provide: ReportService, useValue: ReportServiceMock }],
      imports:[
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
