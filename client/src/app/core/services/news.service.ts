import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
  ) { }

  public count() {
    return this.http.get<any>(`${environment.apiUrl}/api/news/count`);
  }
  public find(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/news?${query}`);
  }
  public findOne(id: string | number) {
    id = id.toString();
    return this.http.get<any>(`${environment.apiUrl}/api/news/${id}?populate=deep`);
  }
  public update(id: string | number, formData: FormData) {
    id = id.toString();
    return this.http.put<any>(`${environment.apiUrl}/api/news/${id}?populate=deep`, formData);
  }

  public create(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/api/news?populate=deep`, formData);
  }
}
