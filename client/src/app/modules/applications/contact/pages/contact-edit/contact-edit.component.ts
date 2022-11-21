import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { IContact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent extends AppHelperComponent implements OnInit {
  public contact!: IContact;
  public loadingData = true;
  public loadingSave = false;
  public idContact!: string;
  public formContact!: FormGroup;
  public formName!: FormGroup;
  public formPro!: FormGroup;
  public formPrivate!: FormGroup;
  public formContactsPro!: FormGroup;
  public formAddressPro!: FormGroup;
  public formContactsPrivate!: FormGroup;
  public formAddressPrivate!: FormGroup;
  constructor(
    private contactService: ContactService,
    public override route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
  ) {
    super(route)
  }

  ngOnInit(): void {
    this.setForm();
    this.idContact = this.route.snapshot.params['id'];
    if (this.idContact) {
      this.contactService.findOne(this.idContact).subscribe({
        next: result => {
          this.contact = result.data;
          this.loadingData = false;
          this.setForm();
        },
        error: err => {
          this.loadingData = false;
        }
      })
    } else {
      this.loadingData = false;
      this.setForm();
    }
  }

  setForm() {
    const cityPro = this.contact?.pro?.address?.city;
    if (cityPro) {
      delete (cityPro as any).id;
    }
    console.log(cityPro)
    const countryPro = this.contact?.pro?.address?.country;
    if (countryPro) {
      delete (countryPro as any).id;
    }
    const cityPrivate = this.contact?.private?.address?.city;
    if (cityPrivate) {
      delete (cityPrivate as any).id;
    }
    const countryPrivate = this.contact?.private?.address?.country;
    if (countryPrivate) {
      delete (countryPrivate as any).id;
    }
    this.formName = this.formBuilder.group({
      civility: [this.contact?.name?.civility],
      firstName: [this.contact?.name?.firstName],
      lastName: [this.contact?.name?.lastName],
    })
    this.formContactsPro = this.formBuilder.group({
      mobilePhone: [this.contact?.pro?.contacts?.mobilePhone],
      fixPhone: [this.contact?.pro?.contacts?.fixPhone],
      otherPhone: [this.contact?.pro?.contacts?.otherPhone],
      url: [this.contact?.pro?.contacts?.url],
      email: [this.contact?.pro?.contacts?.email],
    })
    this.formAddressPro = this.formBuilder.group({
      country: [countryPro],
      city: [cityPro],
      street1: [this.contact?.pro?.address?.street1],
      street2: [this.contact?.pro?.address?.street2],
    })
    this.formAddressPrivate = this.formBuilder.group({
      country: [countryPrivate],
      city: [cityPrivate],
      street1: [this.contact?.private?.address?.street1],
      street2: [this.contact?.private?.address?.street2],
    })
    this.formContactsPrivate = this.formBuilder.group({
      mobilePhone: [this.contact?.private?.contacts?.mobilePhone],
      fixPhone: [this.contact?.private?.contacts?.fixPhone],
      otherPhone: [this.contact?.private?.contacts?.otherPhone],
      url: [this.contact?.private?.contacts?.url],
      email: [this.contact?.private?.contacts?.email],
    })
    this.formPro = this.formBuilder.group({
      contacts: this.formContactsPro,
      address: this.formAddressPro,
      role: [this.contact?.pro?.role]
    })
    this.formPrivate = this.formBuilder.group({
      contacts: this.formContactsPrivate,
      address: this.formAddressPrivate,
      role: [this.contact?.private?.role]
    })
    this.formContact = this.formBuilder.group({
      owner: [this.contact?.owner || this.authentificationService.connectedUser.id],
      user: [this.contact?.user?.id],
      name: this.formName,
      pro: this.formPro,
      private: this.formPrivate
    });
    this.formContact.disable();
    if (!this.loadingData) {
      setTimeout(() =>
        this.formContact.enable(), 1
      )
    }
  }

  onSubmit() {
    if (this.formContact.invalid) {
      return;
    }
    this.formContact.disable();
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.formContact.value));
    let action = this.contactService.create(formData)
    if (this.idContact) {
      action = this.contactService.update(this.contact.id, formData);
    }
    action.subscribe(
      {
        next: data => {
          this.loadingSave = false;
          this.formContact.enable();
        },
        error: err => {
          this.loadingSave = false;
          this.formContact.enable();
        }
      }
    );
  }

  goBack() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'contact'] } }])
  }

}
