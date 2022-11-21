import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriveRoutingModule } from './drive-routing.module';
import { DriveComponent } from './drive.component';
import { DriveMainComponent } from './pages/drive-main/drive-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileTableViewComponent } from './components/file-table-view/file-table-view.component';
import { SelectedEntryInfosComponent } from './components/selected-entry-infos/selected-entry-infos.component';


@NgModule({
  declarations: [
    DriveComponent,
    DriveMainComponent,
    FileTableViewComponent,
    SelectedEntryInfosComponent
  ],
  imports: [
    CommonModule,
    DriveRoutingModule,
    SharedModule
  ]
})
export class DriveModule { }
