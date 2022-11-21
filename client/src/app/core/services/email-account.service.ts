import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailAccountService {

  constructor(
    private http: HttpClient,
  ) { }

  public findMe() {
    return this.http.get<any>(`${environment.apiUrl}/api/emailengine/account`);
  }

  public createorupdate(data) {
    return this.http.post<any>(`${environment.apiUrl}/api/emailengine/account/createOrUpdate`, { data });
  }
}
