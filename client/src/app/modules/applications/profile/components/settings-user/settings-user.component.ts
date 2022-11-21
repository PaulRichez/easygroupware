import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { ThemesService } from 'src/app/core/services/themes.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.scss']
})
export class SettingsUserComponent implements OnInit {
  public userSettings!: FormGroup;
  public loadingSave = false;
  constructor(
    public authentificationService: AuthentificationService,
    private formBuilder: FormBuilder,
    public themesService: ThemesService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.setForm()
  }

  public setForm() {
    this.userSettings = this.formBuilder.group({
      theme: [{ value: this.authentificationService.connectedUser?.user_settings?.theme, disabled: false }, [Validators.required]],
      language: [{ value: this.authentificationService.connectedUser?.user_settings?.language, disabled: false }, [Validators.required]],
      applicationsPlace: [{ value: this.authentificationService.connectedUser?.user_settings?.applicationsPlace, disabled: false }, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.userSettings.invalid) {
      return;
    }
    this.loadingSave = true;
    this.userSettings.disable();
    const formData = new FormData();
    formData.append('data', JSON.stringify({ user_settings: this.userSettings.value }));
    this.usersService.updateMe(formData).subscribe(
      {
        next: data => {
          this.loadingSave = false;
          this.userSettings.enable();
        },
        error: err => {
          this.loadingSave = false;
          this.userSettings.enable();
        }
      }
    );
  }

}
