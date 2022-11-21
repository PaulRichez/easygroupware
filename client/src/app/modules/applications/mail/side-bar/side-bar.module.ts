import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarRoutingModule } from './side-bar-routing.module';
import { SideBarComponent } from './side-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    SideBarRoutingModule,
    SharedModule
  ]
})
export class SideBarModule { }
