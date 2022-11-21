import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmailMailboxesService } from 'src/app/core/services/email-mailboxes.service';
import * as qs from 'qs'
@Component({
  selector: 'app-mail-counter',
  templateUrl: './mail-counter.component.html',
  styleUrls: ['./mail-counter.component.scss']
})
export class MailCounterComponent implements OnInit, OnDestroy {
  private sub: any;
  public count = '--';
  constructor(
    private emailMailboxesService: EmailMailboxesService,
  ) { }
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
  ngOnInit(): void {
    const query = qs.stringify({
      counters: true,
    }, {
      encodeValuesOnly: true,
    });
    this.sub = this.emailMailboxesService.find(query).subscribe({
      next: value => {
        const mailboxes = value.mailboxes
        const count = { messages: 0, unseen: 0 }
        mailboxes.filter(m => !['\\Drafts', '\\Junk', '\\Trash', '\\Sent'].includes(m?.specialUse)).forEach(mailbox => {
          if (mailbox.status) {
            count.messages += mailbox.status.messages
            count.unseen += mailbox.status.unseen
          }
        });
        this.count = count.unseen + ' / ' + count.messages
      },
      error: err => {

      },
    })
  }

}
