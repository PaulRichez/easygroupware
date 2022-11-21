import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router, Routes } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthentificationService } from '../authentification/authentification.service';
import { uid } from 'uid';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  public applicaitonChangeSubject = new BehaviorSubject<{ app: MenuItemExtended, index: number } | null>(null);
  public readonly applications: MenuItemExtended[] = [
    {
      appId: 'dashboard',
      label: 'Dashboard',
      icon: 'fa fa-chart-line',
      unique: true,
      route: {
        path: 'dashboard',
      },
      routeSidebar: {
        path: 'dashboard',
      }
    },
    {
      appId: 'contact',
      label: 'Carnet d\'adresse',
      icon: 'fa fa-address-book',
      route: {
        path: 'contact',
      },

    },
    {
      appId: 'calendar',
      label: 'Calendrier',
      icon: 'fa fa-calendar',
      route: {
        path: 'calendar',
      },
      routeSidebar: {
        path: 'calendar',
      }
    },
    {
      appId: 'mail',
      label: 'Email',
      icon: 'fa fa-envelope',
      route: {
        path: 'mail',
      },
      routeSidebar: {
        path: 'mail',
      }
    },
    {
      appId: 'drive',
      label: 'Fichiers',
      icon: 'fa fa-folder-closed',
      route: {
        path: 'drive',
      },

    },
    {
      appId: 'admin',
      label: 'Panel admin',
      icon: 'fa fa-hammer',
      route: {
        path: 'admin',
      },
      routeSidebar: {
        path: 'admin',
      }
    },
    {
      appId: 'profile',
      label: 'Profile',
      icon: 'fa fa-address-card',
      invisible: true,
      unique: true,
      route: {
        path: 'profile',
      },
      routeSidebar: {
        path: 'profile',
      }
    }
  ]
  public currentApp: MenuItemExtended | null = this.applications[0];
  public applicationsTab: MenuItemExtended[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authentificationService: AuthentificationService,
  ) {
    this.authentificationService.observableconnectedUser.subscribe((user) => {
      if (!user && user !== undefined) {
        this.destroy();
      }
    })
  }

  init() {
    const childrens = (this.route.snapshot as any)._routerState._root.children;
    const prevSession = childrens.filter(c => c.value.outlet.includes('tab_')).map(c => c.children[0]?.children[0]?.value?.routeConfig?.path);
    if (prevSession.length) {
      prevSession.forEach(c => this.openNewApplication(c));
    } else {
      this.openNewApplication('dashboard')
    }
  }

  destroy() {
    this.applicationsTab = [];
    this.currentApp = null;
    this.resetAllRouterOutlets();
  }

  openNewApplication(appId: string, selectIfExists?: boolean) {
    if (selectIfExists) {
      if (this.currentApp?.appId === appId) {
        return;
      }
      const app = this.applicationsTab.find(a => a.appId == appId);
      if (app) {
        this.selectApp(app);
        return;
      }

    }
    if (this.applicationsTab.length >= 10) {
      console.error('Application max level')
      return;
    }
    const app = Object.assign({}, this.applications.find(a => a.appId == appId));
    if (!app) {
      console.error('Application to open : ' + appId + ' not found')
      return;
    }
    if (app.unique) {
      const appExists = this.applicationsTab.find(a => a.appId === appId);
      if (appExists) {
        this.selectApp(appExists);
        return;
      }
    }
    app.uid = uid();
    app.route = Object.assign({}, app.route);
    const freeSlot = this.getFreeSlot()
    app.route.outlet = 'tab_' + freeSlot;
    if (app.routeSidebar) {
      app.routeSidebar = Object.assign({}, app.routeSidebar);
      app.routeSidebar.outlet = 'sidebar_' + freeSlot;
    }
    app.command = () => this.selectApp(app);
    this.applicationsTab.push(app)
    this.selectApp(app)
  }

  private getFreeSlot() {
    if (!this.applicationsTab.length) {
      return 0;
    }
    const slotUsed = this.applicationsTab.map((app) => app?.route?.outlet?.toString().replace('tab_', ''))
    let free: any = null;
    for (let i = 0; i < 10; i++) {
      if (!slotUsed.includes(i.toString())) {
        free = i;
        break;
      }
    }
    return free;
  }

  selectApp(app: MenuItemExtended) {
    if (!this.applicationsTab.find(a => a.uid == app.uid)) {
      console.error('Application to select : ' + app.appId + ' ' + app.uid + ' not found')
      return;
    }
    this.createRouterOutlet(app)
    this.currentApp = app;
    const index = this.applicationsTab.findIndex(a => a.uid == app.uid)
    this.applicaitonChangeSubject.next({ app, index });
  }

  closeApp(app: MenuItemExtended) {
    if (this.applicationsTab.length == 1) {
      console.error('Cant close last app open')
      return;
    }
    const appIndex = this.applicationsTab.findIndex(a => a.uid == app.uid);
    const currentIndex = this.applicationsTab.findIndex(a => a.uid == this.currentApp?.uid);
    let newIndex = currentIndex;
    if (currentIndex == appIndex) {
      if (currentIndex > 0) {
        newIndex--;
      }
    }
    let outletNavNull: any = [{ outlets: { [app.route.outlet as string]: null } }]
    if (app.routeSidebar) {
      outletNavNull = [{ outlets: { [app.route.outlet as string]: null, [app.routeSidebar.outlet as string]: null } }]
    }
    this.router.navigate(outletNavNull)
    this.applicationsTab.splice(appIndex, 1);
    this.selectApp(Object.assign({}, this.applicationsTab[newIndex]))
  }

  private createRouterOutlet(app: MenuItemExtended, childrens?: any) {
    if (!childrens) {
      childrens = (this.route.snapshot as any)._routerState._root.children
    }
    const children = childrens.find((a: any) => a.value.outlet === app.route.outlet);
    if (!children) {
      let outletNavNull: any = [{ outlets: { ['primary']: '', [app.route.outlet as string]: null } }]
      let outletNavPath: any = [{ outlets: { ['primary']: '', [app.route.outlet as string]: ['tab', app.route.path] } }]
      if (app.routeSidebar) {
        outletNavNull = [{ outlets: { ['primary']: '', [app.route.outlet as string]: null, [app.routeSidebar.outlet as string]: null } }]
        outletNavPath = [{ outlets: { ['primary']: '', [app.route.outlet as string]: ['tab', app.route.path], [app.routeSidebar.outlet as string]: ['sidebar', app.route.path] } }]
      }
      this.router.navigate(outletNavNull).then(() => {
        this.router.navigate(outletNavPath)
      })
    }
  }

  public resetAllRouterOutlets() {
    console.log('resetoutlet')
    const childrens = (this.route.snapshot as any)._routerState._root.children
    let router: any = {};
    childrens.forEach((a: any) => {
      router[a.value.outlet] = null
    })
    if (router) {
      this.router.navigate(['', { outlets: router }])
    }
  }

}

export interface MenuItemExtended extends MenuItem {
  route: {
    path: string,
    outlet?: string,
  },
  routeSidebar?: Route;
  appId: string;
  uid?: string;
  invisible?: boolean;
  unique?: boolean;
}