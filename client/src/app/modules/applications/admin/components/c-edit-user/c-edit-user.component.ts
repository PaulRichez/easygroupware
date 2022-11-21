import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, City } from 'country-state-city';
import { ICountry, ICity } from 'country-state-city'
import { UsersService } from 'src/app/core/services/users.service';
import { ThemesService } from 'src/app/core/services/themes.service';
import { GroupesService } from 'src/app/core/services/groupes.service';
import { IUser } from 'src/app/shared/models/user.model';
import { IUserGroup } from 'src/app/shared/models/user-group.model';
@Component({
  selector: 'app-c-edit-user',
  templateUrl: './c-edit-user.component.html',
  styleUrls: ['./c-edit-user.component.scss']
})
export class CEditUserComponent implements OnInit {
  @Input() user!: IUser;
  @Input() loadingData!: boolean;
  @Input() type!: string;
  loadingSave = false;
  loadingDataGroup = true;
  groups: IUserGroup[] = [];
  public formUser!: FormGroup;
  public userExtendedGroup!: FormGroup;
  public countries: ICountry[] = Country.getAllCountries();
  public cities: ICity[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public themesService: ThemesService,
    private groupesService: GroupesService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loadingData'].currentValue == false) {
      setTimeout(() => this.setForm(), 100);
    }
  }

  ngOnInit(): void {
    this.setForm()
    this.fetchGroups();
  }

  public setForm() {
    const city = this.user?.userExtended?.city;
    if (city) {
      delete (city as any).id;
    }
    const country = this.user?.userExtended?.country;
    if (country) {
      delete (country as any).id;
    }
    this.userExtendedGroup = this.formBuilder.group({
      firstName: [{ value: this.user?.userExtended?.firstName, disabled: false }, []],
      lastName: [{ value: this.user?.userExtended?.lastName, disabled: false }, []],
      country: [{ value: country, disabled: false }],
      city: [{ value: city, disabled: false }],
    });
    this.formUser = this.formBuilder.group({
      username: [{ value: this.user?.username, disabled: this.type == 'edit' }, [Validators.required, Validators.minLength(3)]],
      email: [{ value: this.user?.email, disabled: this.type == 'edit' }, [Validators.required, Validators.minLength(6)]],
      userExtended: this.userExtendedGroup,
      user_groups: [{ value: this.user?.user_groups, disabled: false }],
      password: [{ value: '', disabled: false }]
    })
    if (this.user) {
      this.formUser.controls['password'].setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.formUser.controls['password'].clearValidators();
    }
    if (this.user?.userExtended?.country) {
      this.setCitiesAvailable(this.user.userExtended.country);
    }
    if (this.loadingData) {
      this.formUser.disable();
    } else {
      setTimeout(() => this.formUser.enable(), 0);
    }
  }

  private fetchGroups() {
    this.groupesService.find('').subscribe(
      {
        next: result => {
          this.groups = result.data;
          this.loadingSave = false;
        },
        error: err => {
          this.loadingSave = false;
        }
      }
    );
  }

  private setCitiesAvailable(country: ICountry): void {
    if (country) {
      this.cities = City.getCitiesOfCountry(country.isoCode) || [];
    } else {
      this.cities = [];
    }
    if (!this.cities.length) {
      this.userExtendedGroup.get('city')?.setValue(null);
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
    formData.append('data', JSON.stringify(this.formUser.value));
    let action = this.usersService.create(formData)
    if (this.type != 'add') {
      action = this.usersService.update(this.user.id, formData);
    }
    action.subscribe(
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
