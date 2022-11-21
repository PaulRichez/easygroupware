import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ThemesService } from './themes.service';
@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public currentStep = 0;
  public isFirstInstall = true;
  public defaultConfig: any = {
    theme: 'light'
  }
  public formWebsite!: FormGroup;
  public formFirstUser!: FormGroup;
  public userExtenedGroup: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });
  public fileUploadControl = new FormControl(null, [FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['image/*'])]);
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private themesService: ThemesService,
  ) {
    this.setForm();
  }

  public checkFirstInstall() {
    if (!this.isFirstInstall) {
      return of(false);
    } else {
      return this.http.get<any>(`${environment.apiUrl}/api/first-install/check`).pipe(map(result => {
        this.isFirstInstall = result.status;
        return result;
      }));
    }
  }

  public setupFirstInstall(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/api/first-install/setup`, formData);
  }

  private setForm() {
    this.formWebsite = this.formBuilder.group({
      theme: ['light', [Validators.required]],
      society: ['', []],
      logo: this.fileUploadControl,
    });
    this.formFirstUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userExtended: this.userExtenedGroup
    });
  }

}
