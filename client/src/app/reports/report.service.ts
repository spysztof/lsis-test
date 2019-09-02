import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { LsiReport } from '../shared/model/lsi-report';
import { LsiReportFilter } from '../shared/model/lsi-report-filter';
import { map, withLatestFrom } from 'rxjs/operators';

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

    this.filteredReports$ = this.reportFiltersSubject
      .pipe(
        withLatestFrom(this.rawReports$)
      ).pipe(
        map(([filters, rawReports]) => {
          return this.applyFilteres(filters, rawReports)
        })
      )
  }

  private reportsMock: LsiReport[] = [
    { id: 1, name: 'Raport 1', date: new Date(), userName: 'Damian', placeName: 'Warszawa', },
    { id: 2, name: 'Raport 2', date: new Date(), userName: 'Kryspin', placeName: 'Łódź', },
    { id: 3, name: 'Raport 33', date: new Date(), userName: 'Kamil', placeName: 'Warszawa', },
    { id: 4, name: 'Raport 3', date: new Date(), userName: 'Damian', placeName: 'Łódź', },
    { id: 5, name: 'Raport 34', date: new Date(), userName: 'Leszek', placeName: 'Łódź', },
    { id: 6, name: 'Raport 5', date: new Date(), userName: 'Staszek', placeName: 'Łódź', },
    { id: 7, name: 'Raport 53', date: new Date(), userName: 'Pioter', placeName: 'Warszawa', },
    { id: 8, name: 'Raport 15', date: new Date(), userName: 'Kryspin', placeName: 'Łódź', },
  ];

  private rawReportsSubject: ReplaySubject<LsiReport[]>
  private reportFiltersSubject: Subject<LsiReportFilter>

  public getReports(): void {
    this.rawReportsSubject.next(this.reportsMock);
  }

  public filterReports(filters: LsiReportFilter): void {
    this.reportFiltersSubject
      .next(filters)
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
