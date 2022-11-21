import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { BlocComponent } from './components/bloc/bloc.component';



@NgModule({
  declarations: [
    ContactComponent,
    ContactListComponent,
    ContactEditComponent,
    BlocComponent,

  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ]
})
export class ContactModule { }
