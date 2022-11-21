import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditGroupComponent } from './pages/edit-group/edit-group.component';
import { EditNewComponent } from './pages/edit-new/edit-new.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListingGroupComponent } from './pages/listing-group/listing-group.component';
import { ListingNewComponent } from './pages/listing-new/listing-new.component';
import { ListingUserComponent } from './pages/listing-user/listing-user.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { WebsiteSettingsComponent } from './pages/website-settings/website-settings.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
      { path: 'stats', component: StatisticsComponent },
      { path: 'user', component: ListingUserComponent },
      { path: 'user/add', component: EditUserComponent },
      { path: 'user/edit/:id', component: EditUserComponent },
      { path: 'group', component: ListingGroupComponent },
      { path: 'group/add', component: EditGroupComponent },
      { path: 'group/edit/:id', component: EditGroupComponent },
      { path: 'new', component: ListingNewComponent },
      { path: 'new/add', component: EditNewComponent },
      { path: 'new/edit/:id', component: EditNewComponent },
      { path: 'website-settings', component: WebsiteSettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
