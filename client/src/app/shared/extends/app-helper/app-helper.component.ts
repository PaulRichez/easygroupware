import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-helper',
  templateUrl: './app-helper.component.html',
  styleUrls: ['./app-helper.component.scss']
})
export class AppHelperComponent {
  public outlet!: string;
  public appOutlet!: string;
  public appId!: string;
  public appUid!: string;

  constructor(public route: ActivatedRoute) {
    let parent: any = this.route;
    do {
      parent = parent?.parent
    } while (parent.outlet === 'primary');
    this.outlet = parent.outlet;
    if ((parent.outlet as string).includes('sidebar')) {
      this.appOutlet = (parent.outlet as string).replace('sidebar', 'tab');
      this.appId = this.appOutlet.split('_')[0];
    } else {
      this.appOutlet = parent.outlet;
      this.appId = parent.outlet.split('_')[0];
    }
    this.appUid = parent.outlet.split('_')[1];
  }


}
