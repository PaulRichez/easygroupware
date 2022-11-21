import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailMessagesService } from 'src/app/core/services/email-message.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
@Component({
  selector: 'app-mail-show',
  templateUrl: './mail-show.component.html',
  styleUrls: ['./mail-show.component.scss']
})
export class MailShowComponent extends AppHelperComponent implements OnInit, OnDestroy {
  private subParams: any;
  private subMessage: any;
  public subSeen: any;
  public mail!: any;
  public loading = true;
  public error = null;
  constructor(
    private emailMessagesService: EmailMessagesService,
    private router: Router,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }

  ngOnDestroy() {
    if (this.subParams) {
      this.subParams.unsubscribe();
    }
    if (this.subMessage) {
      this.subMessage.unsubscribe();
    }
    if (this.subSeen) {
      clearTimeout(this.subSeen);
    }
  }

  ngOnInit(): void {
    this.subParams = this.route.params.subscribe(params => this.changedMessage(params['id']));
  }

  private changedMessage(id: string) {
    this.loading = true;
    this.error = null;
    this.mail = null;
    if (this.subMessage) {
      this.subMessage.unsubscribe();
    }
    const query = qs.stringify({
      documentStore: true,
      embedAttachedImages: true,
      textType: '*',
    });
    this.subMessage = this.emailMessagesService.get(id, query).subscribe({
      next: value => {
        this.mail = value;
        if (this.mail.unseen) {
          this.subSeen = setTimeout(() => { this.markAsRead() }, 3000)
        }
        this.loading = false;
      },
      error: err => {
        this.error = err;
        this.loading = false;

      },
    })
  }
  public markAsRead() {
    if (!this.mail.unseen) return;
    this.emailMessagesService.updateMail(this.mail, 'seen').subscribe()
  }

  public goBack() {
    const path = this.route.snapshot.params['path'];
    this.router.navigate([{ outlets: { [this.outlet as string]: ['tab', 'mail', 'mailbox', path] } }])
  }

}
