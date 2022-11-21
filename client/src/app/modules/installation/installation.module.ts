import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallationRoutingModule } from './installation-routing.module';
import { InstallationComponent } from './installation.component';

import {StepsModule} from 'primeng/steps';
import { StartComponent } from './pages/start/start.component';
import { StepsComponent } from './pages/steps/steps.component';
import { CoreModule } from 'src/app/core/core.module';
import { SiteComponent } from './pages/steps/pages/site/site.component';
import { FirstUserComponent } from './pages/steps/pages/first-user/first-user.component';

@NgModule({
  declarations: [
    InstallationComponent,
    StartComponent,
    StepsComponent,
    SiteComponent,
    FirstUserComponent,
  ],
  imports: [
    CommonModule,
    InstallationRoutingModule,
    CoreModule,
    StepsModule
  ]
})
export class InstallationModule { }
