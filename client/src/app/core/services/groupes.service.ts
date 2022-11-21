import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GroupesService {

  constructor(
    private http: HttpClient,
  ) { }
  public count() {
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/admin/user-group/count`);
  }
  public find(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/user-group?${query}`);
  }
  public findOne(id: string | number) {
    id = id.toString();
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/user-group/${id}?populate=deep`);
  }
  public update(id: string | number, formData: FormData) {
    id = id.toString();
    return this.http.put<any>(`${environment.apiUrl}/api/user-extended/admin/user-group/${id}?populate=deep`, formData);
  }

  public create(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/api/user-extended/admin/user-group/?populate=deep`, formData);
  }
}
