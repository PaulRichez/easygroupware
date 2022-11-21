import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as qs from 'qs'
import { AuthentificationService } from '../authentification/authentification.service';
@Injectable({
  providedIn: 'root'
})
export class EventSourceService {

  constructor(
    private http: HttpClient,
    private authentificationService: AuthentificationService,
  ) { }

  public findOne(id: string | number, query?: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/event-sources/${id}?${query}`);
  }
  public find() {
    const query = qs.stringify({
      filters: {
        owner: this.authentificationService.connectedUser.id
      },
      populate: ['sharedWith']
    }, {
      encodeValuesOnly: true,
    });
    return this.http.get<any>(`${environment.apiUrl}/api/event-sources?${query}`);
  }

  public create(source: any) {
    source.owner = this.authentificationService.connectedUser.id;
    return this.http.post<any>(`${environment.apiUrl}/api/event-sources`, { data: source });
  }

  public update(source: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/event-sources/${source.id}`, { data: source });
  }
}
