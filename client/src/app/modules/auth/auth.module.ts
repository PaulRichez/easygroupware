import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule
  ]
})
export class AuthModule { }
