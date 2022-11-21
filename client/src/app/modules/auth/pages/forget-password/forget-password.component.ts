import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public formForgetPassword: FormGroup;
  public loading = false;
  constructor(private formBuilder: FormBuilder,) { 
    this.formForgetPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit')
    // stop here if form is invalid
    if (this.formForgetPassword.invalid) {
      return;
    }
    this.loading = true;
    this.formForgetPassword.disable();
  }

}
