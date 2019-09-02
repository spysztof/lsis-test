import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { LsiReport } from '../shared/model/lsi-report';
import { LsiReportFilter } from '../shared/model/lsi-report-filter';
import { map, tap, withLatestFrom } from 'rxjs/operators';

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
        tap(([filters, rawReports]) => {
          // TODO remove this tap in fina version
          console.log('filters', filters); console.log('rawReports', rawReports);
        }),
        map(([filters, rawReports]) => {

          // TODO filter raw data here
          return rawReports
        })
      )
  }

  private reporsMock: LsiReport[] = [
    { id: 1, name: 'Raport 1', date: new Date(), userName: 'Damian', placeName: 'Warszawa', },
    { id: 2, name: 'Raport 2', date: new Date(), userName: 'Kryspin', placeName: 'Łódź', },
    { id: 3, name: 'Raport 3', date: new Date(), userName: 'Kamil', placeName: 'Warszawa', },
    { id: 4, name: 'Raport 3', date: new Date(), userName: 'Damian', placeName: 'Łódź', },
    { id: 5, name: 'Raport 4', date: new Date(), userName: 'Leszek', placeName: 'Łódź', },
    { id: 6, name: 'Raport 5', date: new Date(), userName: 'Staszek', placeName: 'Łódź', },
    { id: 7, name: 'Raport 5', date: new Date(), userName: 'Pioter', placeName: 'Warszawa', },
    { id: 8, name: 'Raport 5', date: new Date(), userName: 'Kryspin', placeName: 'Łódź', },
  ];

  private rawReportsSubject: ReplaySubject<LsiReport[]>
  private reportFiltersSubject: Subject<LsiReportFilter>

  public getReports(): void {
    this.rawReportsSubject.next(this.reporsMock);
  }

  public filterReports(filters: LsiReportFilter): void {
    this.reportFiltersSubject
      .next(filters)
  }
}
