import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
  ) { }

  public count() {
    return this.http.get<any>(`${environment.apiUrl}/api/contact/count`);
  }
  public find(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/contacts?${query}`);
  }
  public findOne(id: string | number) {
    id = id.toString();
    return this.http.get<any>(`${environment.apiUrl}/api/contacts/${id}?populate=deep`);
  }
  public update(id: string | number, formData: FormData) {
    id = id.toString();
    return this.http.put<any>(`${environment.apiUrl}/api/contacts/${id}?populate=deep`, formData);
  }

  public create(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/api/contacts/?populate=deep`, formData);
  }
}
