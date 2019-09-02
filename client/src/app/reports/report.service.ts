import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { LsiReport } from '../shared/model/lsi-report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

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

  constructor(private http: HttpClient) { }

  public getReports(): Observable<LsiReport[]> {
    return of(this.reporsMock);
  }
}
