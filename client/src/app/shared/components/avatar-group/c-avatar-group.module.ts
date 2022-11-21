import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarGroupComponent } from './avatar-group.component';



@NgModule({
  declarations: [
    AvatarGroupComponent
  ],
  imports: [
    CommonModule,
    AvatarGroupModule,
    AvatarModule,
    TooltipModule,
  ],
  exports: [
    AvatarGroupComponent
  ]
})
export class CAvatarGroupModule { }
