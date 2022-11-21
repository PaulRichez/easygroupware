import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { UsersService } from 'src/app/core/services/users.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import { GroupesService } from 'src/app/core/services/groupes.service';
import { IUserGroup } from 'src/app/shared/models/user-group.model';

@Component({
  selector: 'app-listing-group',
  templateUrl: './listing-group.component.html',
  styleUrls: ['./listing-group.component.scss']
})
export class ListingGroupComponent extends AppHelperComponent implements OnInit {

  public loadingData = true;
  public groups: IUserGroup[] = [];
  totalRecords = 0;
  constructor(
    private groupesService: GroupesService,
    public override route: ActivatedRoute,
    private router: Router,
  ) {
    super(route)
  }

  ngOnInit(): void {
  }

  fetchGroups(event: LazyLoadEvent) {
    const sort = event.sortField ? [`${event.sortField}:${event.sortOrder === 1 ? 'asc' : 'desc'}`] : {};
    const query = qs.stringify({
      pagination: {
        page: (event.first || 0) / (event.rows || 5) + 1,
        pageSize: event.rows,
      },
      sort,
      populate: ['deep'],
    }, {
      encodeValuesOnly: true,
    });
    this.loadingData = true;
    this.groupesService.find(query).subscribe({
      next: result => {
        this.groups = result.data;
        this.totalRecords = result.meta.pagination.total;
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
      }

    });
  }

  public add() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'group', 'add'] } }])
  }

  public edit(group: IUserGroup) {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'group', 'edit', group.id] } }])
  }

}
