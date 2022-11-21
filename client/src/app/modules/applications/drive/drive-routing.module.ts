import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriveComponent } from './drive.component';
import { DriveMainComponent } from './pages/drive-main/drive-main.component';

const routes: Routes = [
  {
    path: '', component: DriveComponent,
    children: [
      { path: '', component: DriveMainComponent },
      { path: ':idFolder', component: DriveMainComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriveRoutingModule { }
