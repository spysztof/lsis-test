import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { LsiReport } from 'src/app/shared/model/lsi-report';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lsis-client-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  public filteredReports$: Observable<LsiReport[]>

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.filteredReports$ = this.reportService.getReports();

  }

}
