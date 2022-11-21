import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImapService {

  constructor(
    private http: HttpClient,
  ) { }

  public get() {
    return this.http.get<any>(`${environment.apiUrl}/api/imap-smtp?populate=deep`);
  }
  public update(formData: FormData) {
    return this.http.put<any>(`${environment.apiUrl}/api/imap-smtp?populate=deep`, formData);
  }
}
