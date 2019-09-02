import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, ReplaySubject, combineLatest } from 'rxjs';
import { LsiReport } from '../shared/model/lsi-report';
import { LsiReportFilter } from '../shared/model/lsi-report-filter';
import { map } from 'rxjs/operators';

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

  private readonly BASE_URL = 'http://localhost:3000';
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

      let inDateRange = dateFrom ? this.stripHours(report.date) >= this.stripHours(dateFrom) : true;
      inDateRange = dateTo ? this.stripHours(report.date) <= this.stripHours(dateTo) : true;

      return (report.placeName === (placeName || report.placeName))
        && inDateRange
    });
  }

  private stripHours(date: Date | null): number {
    const MILIS_IN_24H = 86400000;
    return Math.floor(date.getTime() / MILIS_IN_24H);
  }
}

export interface LsiReportListResponseBody {
  [index: number]: LsiReportResponseBody
}

export interface LsiReportResponseBody {
  id: number;
  name: string;
  date: string;
  userName: string;
  placeName: string;
};