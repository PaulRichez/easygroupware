import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import * as qs from 'qs'
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.model';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-listing-user',
  templateUrl: './listing-user.component.html',
  styleUrls: ['./listing-user.component.scss']
})
export class ListingUserComponent extends AppHelperComponent implements OnInit {
  public loadingData = true;
  public users: IUser[] = [];
  public addRoutlet!: any;
  totalRecords = 0;
  constructor(
    private usersService: UsersService,
    public override route: ActivatedRoute,
    private router: Router
  ) {
    super(route)
  }

  ngOnInit(): void {

  }

  fetchUsers(event: LazyLoadEvent) {
    const sort = event.sortField ? [`${event.sortField}:${event.sortOrder === 1 ? 'asc' : 'desc'}`] : {};
    const query = qs.stringify({
      offset: event.first,
      limit: event.rows,
      populate: ['userExtended'],
      sort
    }, {
      encodeValuesOnly: true,
    });
    this.loadingData = true;
    this.usersService.find(query).subscribe({
      next: result => {
        this.users = result.data;
        this.totalRecords = result.meta.pagination.total;
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
      }

    });
  }

  public add() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'user', 'add'] } }])
  }

  public edit(user: IUser) {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'user', 'edit', user.id] } }])
  }
}
