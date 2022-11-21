import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MainSidebarService } from 'src/app/core/services/main-sidebar.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent extends AppHelperComponent implements OnInit {
  public items!: MenuItem[];
  constructor(
    private mainSidebarService: MainSidebarService,
    public override route: ActivatedRoute
    ) {
    super(route);
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Monitoring',
        icon: 'fa-solid fa-chart-bar fa-fw',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'admin', 'stats'] } }],
        command: () => this.mainSidebarService.closeSidebarIfMobile()
      },
      {
        label: 'Utilisateurs',
        icon: 'fa-solid fa-users fa-fw',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'admin', 'user'] } }],
        command: () => this.mainSidebarService.closeSidebarIfMobile()
      },
      {
        label: 'Groupes',
        icon: 'fa-solid fa-user-group fa-fw',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'admin', 'group'] } }],
        command: () => this.mainSidebarService.closeSidebarIfMobile()
      },
      {
        label: 'News',
        icon: 'fa-solid fa-newspaper fa-fw',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'admin', 'new'] } }],
        command: () => this.mainSidebarService.closeSidebarIfMobile()
      },
      {
        label: 'Paramètres du site',
        icon: 'fa-solid fa-gears fa-fw',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'admin', 'website-settings'] } }],
        command: () => this.mainSidebarService.closeSidebarIfMobile()
      },
    ];
    this.items.forEach(item => item.routerLinkActiveOptions = { exact: false })
  }

}
