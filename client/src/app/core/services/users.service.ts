import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from '../authentification/authentification.service';
import { ThemesService } from './themes.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authentificationService: AuthentificationService,
    private themesService: ThemesService
  ) { }

  public count() {
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/admin/user/count`);
  }
  public find(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/user?${query}`);
  }
  public findOne(id: string | number, query?:string) {
    if (!query) query = '';
    id = id.toString();
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/user/${id}?${query}`);
  }
  public updateMe(formData: FormData) {
    return this.http.put<any>(`${environment.apiUrl}/api/user-extended/me?populate=deep`, formData).pipe(map(result => {
      if (result.id === this.authentificationService.connectedUser.id) {
        this.authentificationService.connectedUser = result;
        this.themesService.current = this.authentificationService.connectedUser.user_settings.theme
        this.authentificationService.observableconnectedUser.next(result);
      }
      return result;
    }));
  }
  public update(id: string | number, formData: FormData) {
    id = id.toString();
    return this.http.put<any>(`${environment.apiUrl}/api/user-extended/admin/user/${id}?populate=deep`, formData).pipe(map(result => {
      if (result.id === this.authentificationService.connectedUser.id) {
        this.authentificationService.connectedUser = result;
        this.themesService.current = this.authentificationService.connectedUser.user_settings.theme
        this.authentificationService.observableconnectedUser.next(result);
      }
      return result;
    }));
  }

  public create(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/api/user-extended/admin/user/?populate=deep`, formData);
  }
}
