import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReportListComponent } from './report-list/report-list.component';
import { ReportListFormComponent } from './report-list-form/report-list-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportListComponent,
    ReportListFormComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,

  ],
  exports: [
    ReportListComponent,
    ReportListFormComponent,
  ]
})
export class ReportsModule { }
