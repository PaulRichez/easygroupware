import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { ApplicationsService } from 'src/app/core/services/applications.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public loading = false;
  public error: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private tokenStorageService: TokenStorageService,
    private applicationsService: ApplicationsService,
    private router: Router) {
    this.formLogin = this.formBuilder.group({
      username: [environment.demo ? 'demo.admin' : '', [Validators.required]],
      password: [environment.demo ? 'password' : '', [Validators.required]],
      remenberMe: [true],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }
    this.loading = true;
    this.formLogin.disable();

    this.authService.login(this.formLogin.get('username')?.value, this.formLogin.get('password')?.value).subscribe({
      next: data => {
        this.tokenStorageService.setToken(data.jwt, this.formLogin.get('remenberMe')?.value);
        this.authService.loginWithToken().subscribe(() => this.applicationsService.init());
      },
      error: err => {
        this.error = err;
        this.formLogin.patchValue({ "password": '' });
        this.formLogin.enable();
        this.loading = false;
      }
    });
  }

}
