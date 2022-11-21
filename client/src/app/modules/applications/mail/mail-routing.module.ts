import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailComponent } from './mail.component';
import { ComposeComponent } from './pages/compose/compose.component';
import { MailShowComponent } from './pages/mail-show/mail-show.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';


const routes: Routes = [
  {
    path: '', component: MailComponent, children: [
      { path: '', redirectTo: 'mailbox/INBOX', pathMatch: 'full' },
      {
        path: 'mailbox/:path', component: MailboxComponent
      },
      { path: 'mailbox/:path/:id', component: MailShowComponent },
      { path: 'compose/:id/:action', component: ComposeComponent },
      { path: 'compose', component: ComposeComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule { }
