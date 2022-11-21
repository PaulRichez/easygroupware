import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { EmailMessagesService } from 'src/app/core/services/email-message.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);
@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent extends AppHelperComponent implements OnInit {
  public loading = true;
  public mail: any;
  public sendmessageForm!: FormGroup;
  public modules = {
    imageResize: true
  }
  public messageId!: string;
  public action!: string;
  public files: any[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private emailMessagesService: EmailMessagesService,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }

  ngOnInit(): void {
    this.messageId = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];
    if (this.messageId) {
      this.getMessage();
    } else {
      this.fillFormNewMessage();
    }
  }

  private getMessage() {
    const query = qs.stringify({
      documentStore: true,
      embedAttachedImages: true,
      textType: '*',
    });
    this.emailMessagesService.get(this.messageId, query).subscribe({
      next: (result: any) => {
        this.mail = result;
        this.fillForm();
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  private fillForm() {
    this.sendmessageForm = this.formBuilder.group({
      from: [{ value: this.authentificationService.connectedUser?.email, disabled: true }],
      to: [this.mail.from.address],
      cc: [this.action === 'reply' ? '' : this.mail.cc?.map(cc => cc.address)],
      bcc: [''],
      subject: [this.mail.subject],
      body: [''],
    });
    this.loading = false
  }
  private fillFormNewMessage() {
    this.sendmessageForm = this.formBuilder.group({
      from: [{ value: this.authentificationService.connectedUser?.email, disabled: true }],
      to: [''],
      cc: [''],
      bcc: [''],
      subject: [''],
      body: [''],
    });
    this.loading = false
  }


  public onSubmit() {
    console.log(this.sendmessageForm.value);
    if (!this.sendmessageForm.valid) return;
    // this.loading = true;

    const message: any = {
      envelope: {
        from: this.authentificationService.connectedUser?.email,
        to: this.sendmessageForm.value.to.split(',')[0],
      },
      from: {
        name: "From Me",
        address: this.authentificationService.connectedUser?.email,
      },
      to: this.sendmessageForm.value.to.split(',').map(to => ({ address: to })),
      subject: this.sendmessageForm.value.subject,
      html: this.sendmessageForm.value.body,
      sendAt: new Date().toISOString(),
      trackingEnabled: false,
    }
    if (this.sendmessageForm.value.cc) {
      message.cc = this.sendmessageForm.value.cc.split(',');
    }
    if (this.sendmessageForm.value.bcc) {
      message.bcc = this.sendmessageForm.value.bcc.split(',');
    }
    if (this.messageId) {
      message.reference = {
        message: this.messageId,
        action: this.action.includes('reply') ? 'reply' : 'forward',
      }
    }
    if (this.files.length > 0) {
      message.attachments = [];
      this.files.forEach(file => {
        if (file.uploaded && !file.error && file.reader.result) {
          const pj: any = {
            filename: file.file.name,
            content: file.reader.result?.toString().split("base64,")[1],
            contentType: file.file.type,
            encoding: 'base64'
          }
          if (message.attachments) {
            message.attachments.push(pj);
          }
        };
      });
    }
    this.emailMessagesService.submit(message).subscribe({
      next: (result: any) => {
        console.log(result)
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    });
  }


  public goBack() {
    if (this.mail) {
      this.router.navigate([{ outlets: { [this.outlet as string]: ['tab', 'mail', 'mailbox', this.mail.path, this.mail.id] } }])
    } else {
      this.router.navigate([{ outlets: { [this.outlet as string]: ['tab', 'mail'] } }])
    }
  }
}
