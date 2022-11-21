import { Component, OnInit, Input } from '@angular/core';
import { EmailMessagesService } from 'src/app/core/services/email-message.service';

@Component({
  selector: 'app-message-attachments',
  templateUrl: './message-attachments.component.html',
  styleUrls: ['./message-attachments.component.scss']
})
export class MessageAttachmentsComponent implements OnInit {
  @Input() attachments!: any[];
  constructor(
    private emailMessagesService: EmailMessagesService,
  ) { }

  ngOnInit(): void {
  }

  downloadAttachment(attachment, index) {
    this.emailMessagesService.downloadAttachment(attachment.id).subscribe({
      next: (result: any) => {
        const blob = new Blob([result], { type: attachment.contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = attachment.filename;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
