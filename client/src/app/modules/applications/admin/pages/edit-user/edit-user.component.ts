import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { IUser } from 'src/app/shared/models/user.model';
import * as qs from 'qs'
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends AppHelperComponent implements OnInit {
  public user!: IUser;
  public loadingData = true;
  public idUser!: string;
  constructor(
    public override route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
    super(route);
  }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id'];
    if (this.idUser) {
      const query = qs.stringify({
        populate: ['userExtended', 'user_groups'],
      }, {
        encodeValuesOnly: true,
      });
      this.usersService.findOne(this.idUser, query).subscribe({
        next: result => {
          this.user = result;
          this.loadingData = false;
        },
        error: err => {
          this.loadingData = false;
        }
      })
    } else {
      this.loadingData = false;
    }
  }
  goBack() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'user'] } }])
  }
}
