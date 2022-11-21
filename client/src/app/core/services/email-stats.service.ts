import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailStatsService {

  constructor(
    private http: HttpClient,
  ) { }

  public countAccounts() {
    return this.http.get<any>(`${environment.apiUrl}/api/emailengine/countAccounts`);
  }
  public get() {
    return this.http.get<any>(`${environment.apiUrl}/api/emailengine/stats`);
  }
}
