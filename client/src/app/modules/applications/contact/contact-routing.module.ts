import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';

const routes: Routes = [
  {
    path: '', component: ContactComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContactListComponent },
      { path: 'add', component: ContactEditComponent },
      { path: 'edit/:id', component: ContactEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
