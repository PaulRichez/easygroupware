import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss']
})
export class GlobalLoaderComponent implements OnInit {
  isDemo = environment.demo;
  constructor() { }

  ngOnInit(): void {
  }

}
