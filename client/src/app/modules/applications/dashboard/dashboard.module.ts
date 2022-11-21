import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewComponent } from './pages/new/new.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMainComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
