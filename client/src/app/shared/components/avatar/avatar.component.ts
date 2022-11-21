import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges {
  @Input() user!: IUser;
  @Input() size!: string;
  @Input() styleClass!: string;

  label!: string;
  constructor(private authentificationService: AuthentificationService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.user) {
      return;
    }
    if (this.user.userExtended.avatar) {
      this.label = '';
      return;
    }
    if (this.user.userExtended.firstName && this.user.userExtended.lastName) {
      this.label = this.user.userExtended.firstName.charAt(0) + this.user.userExtended.lastName.charAt(0);
    }
    if (!this.label) {
      const split = this.user.username.split('.');
      if (split.length > 1) {
        this.label = split[0][0] + split[1][0];
      }
      else {
        this.label = this.user.username.charAt(0);
      }
    }
    this.label = this.label.toUpperCase();
  }

  stringToColour(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return `hsl(${(hash % 360)}, 100%, 30%)`;
  }
}
