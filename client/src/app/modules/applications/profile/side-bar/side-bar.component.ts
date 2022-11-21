import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent extends AppHelperComponent implements OnInit {
  public items!: MenuItem[];
  constructor(public override route: ActivatedRoute) {
    super(route);
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Mes informations',
        icon: 'fa-solid fa-user fa-fw',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'profile', 'my-profile'] } }]
      },
      {
        label: 'Mes paramètres',
        icon: 'fa-solid fa-gears fa-fw',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'profile', 'my-settings'] } }]
      },
    ];
  }

}
