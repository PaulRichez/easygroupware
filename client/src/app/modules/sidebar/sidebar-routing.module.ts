import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

const routes: Routes = [{
  path: '', component: SidebarComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('../../modules/applications/dashboard/sidebar/sidebar.module').then(m => m.SidebarModule),
    },
    {
      path: 'admin',
      loadChildren: () => import('../../modules/applications/admin/side-bar/side-bar.module').then(m => m.SideBarModule),
    },
    {
      path: 'mail',
      loadChildren: () => import('../../modules/applications/mail/side-bar/side-bar.module').then(m => m.SideBarModule),
    },
    {
      path: 'calendar',
      loadChildren: () => import('../../modules/applications/calendar/side-bar/side-bar.module').then(m => m.SideBarModule),
    },
    {
      path: 'profile',
      loadChildren: () => import('../../modules/applications/profile/side-bar/side-bar.module').then(m => m.SideBarModule),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
