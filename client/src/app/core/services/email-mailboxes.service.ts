import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailMailboxesService {

  constructor(
    private http: HttpClient,
  ) { }

  public find(query?: string) {
    if (!query) query = '';
    return this.http.get<any>(`${environment.apiUrl}/api/emailengine/mailboxes?${query}`);
  }
  public delete(path: string) {
    return this.http.delete<any>(`${environment.apiUrl}/api/emailengine/mailbox?path=${path}`);
  }

  public create(paths: string[]) {
    return this.http.post<any>(`${environment.apiUrl}/api/emailengine/mailbox`, { data: paths });
  }

}
