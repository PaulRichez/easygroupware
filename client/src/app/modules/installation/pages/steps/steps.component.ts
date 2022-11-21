import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Site',
      routerLink: 'site'
    },
    {
      label: 'Premier utilisateur',
      routerLink: 'first-user'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
