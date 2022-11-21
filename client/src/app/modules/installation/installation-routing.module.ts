import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsCurrentStep } from 'src/app/core/guard/installation/is-current-step.guard';
import { InstallationComponent } from './installation.component';
import { StartComponent } from './pages/start/start.component';
import { FirstUserComponent } from './pages/steps/pages/first-user/first-user.component';
import { SiteComponent } from './pages/steps/pages/site/site.component';
import { StepsComponent } from './pages/steps/steps.component';

const routes: Routes = [
  {
    path: '', component: InstallationComponent, children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: StartComponent },
      {
        path: 'steps', component: StepsComponent, children: [
          { path: '', redirectTo: 'site', pathMatch: 'full' },
          { path: 'site', component: SiteComponent, canActivate: [IsCurrentStep], data: { step: 1 } },
          { path: 'first-user', component: FirstUserComponent, canActivate: [IsCurrentStep], data: { step: 2 } },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallationRoutingModule { }
