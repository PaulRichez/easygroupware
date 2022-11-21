import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { MailCounterComponent } from './components/mail-counter/mail-counter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DriveSizeComponent } from './components/drive-size/drive-size.component';


@NgModule({
  declarations: [
    SidebarComponent,
    MailCounterComponent,
    DriveSizeComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    SharedModule
  ]
})
export class SidebarModule { }
