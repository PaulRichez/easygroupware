import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from '../authentification/authentification.service';
import { BehaviorSubject, map } from 'rxjs';
import * as qs from 'qs'
@Injectable({
  providedIn: 'root'
})
export class EventService {
  observableEvents = new BehaviorSubject<any>(null);
  constructor(
    private http: HttpClient,
    private authentificationService: AuthentificationService,
  ) { }
  public find(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/events?${query}`);
  }

  public create(event: any) {
    const query = qs.stringify({
      populate: ['deep']
    }, {
      encodeValuesOnly: true,
    });
    event.owner = this.authentificationService.connectedUser.id;
    return this.http.post<any>(`${environment.apiUrl}/api/events?${query}`, { data: event }).pipe(
      map(data => {
        this.observableEvents.next({ type: 'create', event: data })
        return data;
      })
    );
  }

  public update(event: any) {
    const query = qs.stringify({
      populate: ['deep']
    }, {
      encodeValuesOnly: true,
    });
    return this.http.put<any>(`${environment.apiUrl}/api/events/${event.id}?${query}`, { data: event }).pipe(
      map(data => {
        this.observableEvents.next({ type: 'update', event: data })
        return data;
      })
    );
  }
  public delete(eventId: string | number) {
    return this.http.delete<any>(`${environment.apiUrl}/api/events/${eventId}`).pipe(
      map(data => {
        this.observableEvents.next({ type: 'delete', event: eventId })
        return data;
      })
    );
  }
}
