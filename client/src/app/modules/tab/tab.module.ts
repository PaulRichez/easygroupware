import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabRoutingModule } from './tab-routing.module';
import { TabComponent } from './tab.component';


@NgModule({
  declarations: [
    TabComponent
  ],
  imports: [
    CommonModule,
    TabRoutingModule
  ]
})
export class TabModule { }
