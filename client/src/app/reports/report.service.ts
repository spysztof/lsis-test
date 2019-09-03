import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, ReplaySubject, combineLatest } from 'rxjs';

import { LsiReport } from '../shared/model/lsi-report';
import { LsiReportFilter } from '../shared/model/lsi-report-filter';
import { LsiReportListResponseBody } from '../shared/model/lsi-report-response-body';
import { LsiReportResponseBody } from '../shared/model/lsi-report-list-response-body';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public readonly INITAL_FILTERS: LsiReportFilter = {
    placeFormControl: null,
    dateFromFormControl: null,
    dateToFormControl: null,
  };

  public filteredReports$: Observable<LsiReport[]>
  public rawReports$: Observable<LsiReport[]>

  constructor(private http: HttpClient) {
    this.reportFiltersSubject = new BehaviorSubject(this.INITAL_FILTERS);
    this.rawReportsSubject = new ReplaySubject();
    this.rawReports$ = this.rawReportsSubject.asObservable();

    this.filteredReports$ = combineLatest(this.reportFiltersSubject, this.rawReports$)
      .pipe(
        map(([filters, rawReports]) => {
          return this.applyFilteres(filters, rawReports)
        })
      )
  }

  private readonly BASE_URL = `${environment.api.host}:${environment.api.port}`;
  private rawReportsSubject: ReplaySubject<LsiReport[]>
  private reportFiltersSubject: Subject<LsiReportFilter>

  public async getReports(): Promise<void> {
    const endpoint = '/reports'

    const response = await this.getFromApi<LsiReportListResponseBody>(endpoint)
      .toPromise<LsiReportListResponseBody>();

    const list = (response as Array<LsiReportResponseBody>)
      .map(r => { return { ...r, date: new Date(r.date) } });

    this.rawReportsSubject.next(list);
  }

  public filterReports(filters: LsiReportFilter): void {
    this.reportFiltersSubject
      .next(filters)
  }

  private getFromApi<T>(path: string): Observable<T> {
    return this.http.get<T>(this.BASE_URL + path, { responseType: "json" });
  }

  private applyFilteres(filters: LsiReportFilter, rawReports: LsiReport[]): LsiReport[] {
    return rawReports.filter((report: LsiReport) => {

      let placeName = filters.placeFormControl;
      let dateFrom = filters.dateFromFormControl;
      let dateTo = filters.dateToFormControl;

      const isAfterDateFrom = dateFrom ? this.stripHours(report.date) >= this.stripHours(dateFrom) : true;
      const isBeforeDateTo = dateTo ? this.stripHours(report.date) <= this.stripHours(dateTo) : true;

      return (report.placeName === (placeName || report.placeName)) && isAfterDateFrom && isBeforeDateTo;
    });
  }

  private stripHours(date: Date | null): number {
    date.setHours(0,0,0,0);
    return date.getTime();
  }
}
