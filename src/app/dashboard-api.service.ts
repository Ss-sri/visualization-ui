import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardReq } from './model/dashboard-req.model';
import { Observable, catchError } from 'rxjs';
import { Data } from './model/data';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  host = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getDashboardData(dashboardReq: DashboardReq): Observable<Data[]> {
    const params = new HttpParams({fromObject: {...dashboardReq}})
    return this.http.get<Data[]>(`${this.host}/dashboard`, {params});
  }
}
