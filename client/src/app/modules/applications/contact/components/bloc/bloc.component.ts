import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country, City } from 'country-state-city';
import { ICountry, ICity } from 'country-state-city'

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss']
})
export class BlocComponent implements OnInit, OnChanges {
  @Input() formBloc!: FormGroup;
  @Input() formContacts!: FormGroup;
  @Input() formAddress!: FormGroup;
  @Input() type: string = 'pro'
  public countries: ICountry[] = Country.getAllCountries();
  public cities: ICity[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formAddress']) {
      this.setCitiesAvailable(this.formAddress.get('country')?.value);
    }
  }

  ngOnInit(): void {
    this.setCitiesAvailable(this.formAddress.get('country')?.value);
  }

  private setCitiesAvailable(country: ICountry): void {
    if (country) {
      this.cities = City.getCitiesOfCountry(country.isoCode) || [];
    } else {
      this.cities = [];
    }
    if (!this.cities.length) {
      this.formAddress.get('city')?.setValue(null);
    }
  }

  changeCountry(country: ICountry): void {
    this.setCitiesAvailable(country);
  }

}
