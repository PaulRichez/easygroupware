import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { EmailAccountService } from 'src/app/core/services/email-account.service';
import { ImapService } from 'src/app/core/services/imap.service';

@Component({
  selector: 'app-settings-email',
  templateUrl: './settings-email.component.html',
  styleUrls: ['./settings-email.component.scss']
})
export class SettingsEmailComponent implements OnInit {
  public form!: FormGroup;
  public imapForm!: FormGroup;
  public smtpForm!: FormGroup;
  private imapSmtpConfig: any;
  public emailAccount: any;
  constructor(
    public authentificationService: AuthentificationService,
    private imapService: ImapService,
    private formBuilder: FormBuilder,
    private emailAccountService: EmailAccountService
  ) { }

  ngOnInit(): void {
    this.getAccountinfo();
    this.setForm();
    this.imapService.get().subscribe({
      next: data => {
        this.imapSmtpConfig = data.data;
        this.setForm(true);
      },
      error: err => {
        this.setForm(true);
      }
    })
  }

  private getAccountinfo() {
    this.emailAccountService.findMe().subscribe({
      next: data => {
        this.emailAccount = data;
      },
      error: err => {
        this.emailAccount = err?.error;
      }
    });
  }

  private setForm(enabled?: boolean) {
    this.imapForm = this.formBuilder.group({
      host: [this.imapSmtpConfig?.imap?.host || '', [Validators.required]],
      port: [this.imapSmtpConfig?.imap?.port || '', [Validators.required]],
      secure: [this.imapSmtpConfig?.imap?.secure || false],
      tls: this.formBuilder.group({
        rejectUnauthorized: [this.imapSmtpConfig?.imap?.tls?.rejectUnauthorized || false],
        minVersion: [this.imapSmtpConfig?.imap?.tls?.minVersion || ''],
      })
    });
    this.smtpForm = this.formBuilder.group({
      host: [this.imapSmtpConfig?.smtp?.host || '', [Validators.required]],
      port: [this.imapSmtpConfig?.smtp?.port || '', [Validators.required]],
      secure: [this.imapSmtpConfig?.smtp?.secure || false],
      tls: this.formBuilder.group({
        rejectUnauthorized: [this.imapSmtpConfig?.smtp?.tls?.rejectUnauthorized || false],
        minVersion: [this.imapSmtpConfig?.smtp?.tls?.minVersion || ''],
      })
    });
    this.form = this.formBuilder.group({
      password: ['', Validators.required]
    });
    this.imapForm.disable();
    this.smtpForm.disable();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.emailAccountService.createorupdate(this.form.value).subscribe({
      next: data => {
        this.getAccountinfo();
        // TODO websocket
        setTimeout(() => this.getAccountinfo(), 5000)
      },
      error: err => {
        console.log(err)
      }
    });
  }

}
