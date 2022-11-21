import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, City } from 'country-state-city';
import { ICountry, ICity } from 'country-state-city'
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { GroupesService } from 'src/app/core/services/groupes.service';
import { ThemesService } from 'src/app/core/services/themes.service';
import { UsersService } from 'src/app/core/services/users.service';
import { IUserGroup } from 'src/app/shared/models/user-group.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  loadingSave = false;
  loadingDataGroup = true;
  groups: IUserGroup[] = [];
  public formUser!: FormGroup;
  public userExtended!: FormGroup;
  public countries: ICountry[] = Country.getAllCountries();
  public cities: ICity[] = [];
  constructor(
    public authentificationService: AuthentificationService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public themesService: ThemesService,
    private groupesService: GroupesService
  ) { }

  ngOnInit(): void {
    this.setForm()
  }
  public setForm() {
    const city = this.authentificationService.connectedUser?.userExtended?.city;
    if (city) {
      delete (city as any).id;
    }
    const country = this.authentificationService.connectedUser?.userExtended?.country;
    if (country) {
      delete (country as any).id;
    }
    this.userExtended = this.formBuilder.group({
      firstName: [{ value: this.authentificationService.connectedUser?.userExtended?.firstName, disabled: false }, [Validators.required]],
      lastName: [{ value: this.authentificationService.connectedUser?.userExtended?.lastName, disabled: false }, [Validators.required]],
      country: [{ value: country, disabled: false }],
      city: [{ value: city, disabled: false }],

    });
    this.formUser = this.formBuilder.group({
      userExtended: this.userExtended,
      userGroup: [{ value: this.authentificationService.connectedUser?.user_groups, disabled: false }],
    })
    if (this.authentificationService.connectedUser?.userExtended?.country) {
      this.setCitiesAvailable(this.authentificationService.connectedUser.userExtended.country);
    }
    this.formUser.enable();
  }

  private setCitiesAvailable(country: ICountry): void {
    if (country) {
      this.cities = City.getCitiesOfCountry(country.isoCode) || [];
    } else {
      this.cities = [];
    }
    if (!this.cities.length) {
      this.userExtended.get('city')?.setValue(null);
    }
  }

  changeCountry(country: ICountry): void {
    this.setCitiesAvailable(country);
  }

  onSubmit() {
    if (this.formUser.invalid) {
      return;
    }
    this.formUser.disable();
    const formData = new FormData();
    formData.append('data', JSON.stringify({ userExtended: this.userExtended.value }));
    this.usersService.updateMe(formData).subscribe(
      {
        next: data => {
          this.loadingSave = false;
          this.formUser.enable();
        },
        error: err => {
          this.loadingSave = false;
          this.formUser.enable();
        }
      }
    );
  }

}
