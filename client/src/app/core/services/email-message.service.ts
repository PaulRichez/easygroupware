import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailMessagesService {

  constructor(
    private http: HttpClient,
  ) { }

  public search(data, query: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/emailengine/messages?${query}`, { data });
  }

  public get(id: string, query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/emailengine/message/${id}?${query}`);
  }
  public update(id: string, data: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/emailengine/message/${id}`, { data });
  }

  public downloadAttachment(id: string) {
    return this.http.get(`${environment.apiUrl}/api/emailengine/attachment/${id}`, { responseType: 'blob' })
  }

  public submit(data: any) {
    return this.http.post(`${environment.apiUrl}/api/emailengine/submit`, { data })
  }
  public getSourceMessage(id: string) {
    return this.http.get(`${environment.apiUrl}/api/emailengine/message/${id}/source`, { responseType: 'blob' })
  }

  // no API
  public updateMail(mail: any, action: string) {
    let payload: any = null;
    if (action === 'seen') {
      if (mail.unseen) {
        payload = {
          flags: {
            add: ["\\Seen"]
          },
        };
      } else {
        payload = {
          flags: {
            delete: ["\\Seen"]
          },
        };
      }
    }
    if (action === 'flag') {
      if (!mail.flagged) {
        payload = {
          flags: {
            add: ["\\Flagged"]
          },
        };
      } else {
        payload = {
          flags: {
            delete: ["\\Flagged"]
          },
        };
      }
    }
    return this.update(mail.id, payload);
  }
  public saveAsMail(mail: any) {
    this.getSourceMessage(mail.id).subscribe({
      next: (response: any) => {
        const blob = new Blob([response], { type: 'text/plain' });
        console.log(blob)
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filename.eml';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    }
    );
  }

}
