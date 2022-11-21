import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailMailboxesService } from 'src/app/core/services/email-mailboxes.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import { EmailMessagesService } from 'src/app/core/services/email-message.service';
@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent extends AppHelperComponent implements OnInit, OnDestroy {
  public selectedMailbox: any;
  public loadingMessages = true;
  public errMessage: any;
  public messages: any[] = [];
  private subSearch: any;
  private submailbox: any;
  private subParams: any;
  constructor(
    private emailMailboxesService: EmailMailboxesService,
    private emailMessagesService: EmailMessagesService,
    private router: Router,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }
  ngOnDestroy(): void {
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
    if (this.submailbox) {
      this.submailbox.unsubscribe();
    }
    if (this.subParams) {
      this.subParams.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.subParams = this.route.params.subscribe(params => this.changedMailbox(params['path']))
  }

  changedMailbox(path: string) {
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
    if (this.submailbox) {
      this.submailbox.unsubscribe();
    }
    this.loadingMessages = true;
    this.errMessage = null;
    this.messages = [];
    this.submailbox = this.emailMailboxesService.find().subscribe({
      next: result => {
        const prevMailbox = this.selectedMailbox;
        this.selectedMailbox = result.mailboxes.find(m => m.path == path)
        if (prevMailbox) {
          this.fetchMessages({} as any);
        }
      },
      error: err => {

      }
    });
  }
  refresh() {
    this.fetchMessages({} as any);
  }

  fetchMessages(event: any) {
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
    this.loadingMessages = true;
    this.errMessage = null;
    this.messages = [];
    const query = qs.stringify({
      page: (event.first || 0) / (event.rows || 25),
      pageSize: event.rows || 25,
      path: this.selectedMailbox.path,
    });
    let search = {};
    this.subSearch = this.emailMessagesService.search({ search }, query).subscribe({
      next: data => {
        this.loadingMessages = false
        this.messages = data.messages
      },
      error: err => {
        this.loadingMessages = false
        this.errMessage = err.error;
      }
    })
  }

  showEmail(email: any) {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'mail', 'mailbox', this.selectedMailbox.path, email.id] } }])
  }

  newMail() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'mail', 'compose'] } }])
  }
}
