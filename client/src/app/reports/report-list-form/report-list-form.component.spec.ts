import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportListFormComponent } from './report-list-form.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { ReportService } from '../report.service';
import { ReportServiceMock } from 'src/app/shared/test-mocks/mocks.spec';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

describe('ReportListFormComponent', () => {
  let component: ReportListFormComponent;
  let fixture: ComponentFixture<ReportListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportListFormComponent, HeaderComponent],
      providers: [{ provide: ReportService, useValue: ReportServiceMock }],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
