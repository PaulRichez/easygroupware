import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ListingUserComponent } from './pages/listing-user/listing-user.component';
import { ListingGroupComponent } from './pages/listing-group/listing-group.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditGroupComponent } from './pages/edit-group/edit-group.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { WebsiteSettingsComponent } from './pages/website-settings/website-settings.component';
import { ListingNewComponent } from './pages/listing-new/listing-new.component';
import { EditNewComponent } from './pages/edit-new/edit-new.component';
import { ConfigImapComponent } from './components/config-imap/config-imap.component';
import { CEditUserComponent } from './components/c-edit-user/c-edit-user.component';
import { ConfigDriveComponent } from './components/config-drive/config-drive.component';
import { InfoEmailengineComponent } from './components/info-emailengine/info-emailengine.component';


@NgModule({
  declarations: [
    AdminComponent,
    StatisticsComponent,
    ListingUserComponent,
    ListingGroupComponent,
    EditUserComponent,
    EditGroupComponent,
    StatsCardComponent,
    WebsiteSettingsComponent,
    ListingNewComponent,
    EditNewComponent,
    ConfigImapComponent,
    CEditUserComponent,
    ConfigDriveComponent,
    InfoEmailengineComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
