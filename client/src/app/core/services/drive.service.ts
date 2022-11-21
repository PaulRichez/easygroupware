import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(
    private http: HttpClient,
  ) { }

  public findOne(id: string | number, query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/folder/${id}?${query}`);
  }
  public getmyDriveRoot(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/folder/drive/my-drive?${query}`);
  }

  public getmyDriveSize() {
    return this.http.get<any>(`${environment.apiUrl}/api/folder/drive/my-drive/size`);
  }

  public createFolder(name, idParent) {
    return this.http.post<any>(`${environment.apiUrl}/api/folder/drive/new-folder/${idParent}`, { data: { name } });
  }
  public renameFolder(name, idParent) {
    return this.http.put<any>(`${environment.apiUrl}/api/folder/drive/rename-folder/${idParent}`, { data: { name } });
  }
  public renameFile(name, idFile) {
    return this.http.put<any>(`${environment.apiUrl}/api/folder/drive/rename-file/${idFile}`, { data: { name } });
  }


  public createFiles(formData: any, idParent) {
    return this.http.post<any>(`${environment.apiUrl}/api/folder/drive/upload/${idParent}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  public downloadFile(file: any) {
    return this.http.get(`${environment.apiUrl}${file.url}`, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteFile(idFile: string) {
    return this.http.delete<any>(`${environment.apiUrl}/api/folder/drive/file/${idFile}`);
  }
  public deleteFolder(idFolder: string) {
    return this.http.delete<any>(`${environment.apiUrl}/api/folder/drive/folder/${idFolder}`);
  }

  public getAveragedDriveSize() {
    return this.http.get<any>(`${environment.apiUrl}/api/folder/admin/drive/averaged-size`);
  }
  public getTotalDriveSize() {
    return this.http.get<any>(`${environment.apiUrl}/api/folder/admin/drive/total-size`);
  }
}
