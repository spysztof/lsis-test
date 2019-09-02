import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReportService } from '../report.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lsis-client-report-list-form',
  templateUrl: './report-list-form.component.html',
  styleUrls: ['./report-list-form.component.css']
})
export class ReportListFormComponent implements OnInit {

  public form: FormGroup;
  public locationNames$: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.reportService.getReports()
    this.locationNames$ = this.reportService.rawReports$
      .pipe(
        map(reports =>
          Array.from(new Set(reports.map(r => r.placeName)))
        )
      );

    this.form = this.fb.group(
      this.reportService.INITAL_FILTERS
    );
  }

  public onSubmit() {
    this.reportService.filterReports(this.form.value)
    // console.log(this.form.value);
  }
}
