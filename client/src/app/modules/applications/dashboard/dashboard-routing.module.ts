import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { NewComponent } from './pages/new/new.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: DashboardMainComponent },
      { path: 'new/:id', component: NewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
