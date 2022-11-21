import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/auth/models/user.model';
import { ApiUsersService } from '../../services/api-users.service';
import { SiteManagerService } from '../../services/site-manager.service';

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.scss']
})
export class AvatarGroupComponent implements OnInit, OnChanges {
  @Input() users: IUser[] = [];
  @Input() maxShow = 5;

  public usersShow: any[] = [];
  public otherUsersCount!: string;
  constructor(private siteManager: SiteManagerService, private apiUsersService: ApiUsersService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.users) {
      return;
    }
    this.usersShow = [];
    this.otherUsersCount = '';
    this.users.slice(0, this.maxShow).forEach(async u => {
      const user =
      {
        name: this.siteManager.getUserLabel(u),
        label: this.getLabel(u).toUpperCase(),
        color: this.stringToColour(this.getLabel(u)),
        image: ''
      };
      const i = this.usersShow.push(user);
      this.getAvatar(u, i - 1)
    });
    this.otherUsersCount = this.users.length - this.maxShow > 0 ? (this.users.length - this.maxShow).toString() : '';
  }
  private async getAvatar(user, index: number) {
    if (!user.avatar) {
      this.usersShow[index].image = '';
    }
    else {
      this.apiUsersService.getAvatar(user.id).subscribe(data => {
        this.blobToBase64(data).then((result) => {
          this.usersShow[index].image = result
        })
      });
    }
  }
  ngOnInit(): void { }
  private blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  private getLabel(user: IUser): string {
    if (user.firstName && user.lastName) {
      return user.firstName.charAt(0) + user.lastName.charAt(0);
    }
    const split = user.username.split('.');
    if (split.length > 1) {
      return split[0][0] + split[1][0];
    }
    else {
      return user.username.charAt(0);
    }
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
