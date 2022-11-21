import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'my-profile', pathMatch: 'full' },
      { path: 'my-profile', component: MyProfileComponent},
      { path: 'my-settings', component: MySettingsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
