import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { CalendarMainComponent } from './components/calendar-main/calendar-main.component';

const routes: Routes = [
  {
    path: '', component: CalendarComponent,
    children: [
      { path: '', component: CalendarMainComponent },
      { path: ':id', component: CalendarMainComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
