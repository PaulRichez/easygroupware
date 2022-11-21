import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultConfigService {
  defaultConfig: any = null;
  constructor(
    private http: HttpClient,
  ) { }

  public get() {
    return this.http.get<any>(`${environment.apiUrl}/api/first-install/default-config?populate=deep`).pipe(map(result => {
      this.defaultConfig = result.data;
    }));
  }
  public update(data: FormData) {
    return this.http.put<any>(`${environment.apiUrl}/api/first-install/default-config?populate=deep`, data).pipe(
      map(data => {
        this.defaultConfig = data.data
      })
    );
  }
}
