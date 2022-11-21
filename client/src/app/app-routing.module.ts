import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { IsFirstInstallGuard } from './core/guard/installation/is-first-install.guard';
import { IsNotFirstInstallGuard } from './core/guard/installation/is-not-first-install.guard';
import { IsLoggedGuard } from './core/guard/login/is-logged.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate: [IsNotFirstInstallGuard] },
  { path: 'setup', loadChildren: () => import('./modules/installation/installation.module').then(m => m.InstallationModule), canActivate: [IsFirstInstallGuard] },
  {
    path: '**', pathMatch: 'full',
    component: NotFoundComponent
  },
];
const preTab: Route = { path: 'tab', loadChildren: () => import('./modules/tab/tab.module').then(m => m.TabModule), canActivate: [IsLoggedGuard] };
const preSidebar: Route = { path: 'sidebar', loadChildren: () => import('./modules/sidebar/sidebar.module').then(m => m.SidebarModule), canActivate: [IsLoggedGuard] };
for (let i = 0; i < 10; i++) {
  let preT = Object.assign({}, preTab);
  let preS = Object.assign({}, preSidebar);
  preT.outlet = 'tab_' + i
  preS.outlet = 'sidebar_' + i
  routes.push(preT)
  routes.push(preS)
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public routes = routes;
  constructor() { }
}
