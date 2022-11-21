import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { INews } from 'src/app/shared/models/news.model';
import * as qs from 'qs'
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-listing-new',
  templateUrl: './listing-new.component.html',
  styleUrls: ['./listing-new.component.scss']
})
export class ListingNewComponent extends AppHelperComponent implements OnInit {

  public loadingData = true;
  public news: INews[] = [];
  totalRecords = 0;

  constructor(
    private newsService: NewsService,
    public override route: ActivatedRoute,
    private router: Router,
  ) {
    super(route);
  }

  ngOnInit(): void {
  }

  fetchNews(event: LazyLoadEvent) {
    const sort = event.sortField ? [`${event.sortField}:${event.sortOrder === 1 ? 'asc' : 'desc'}`] : {};
    const query = qs.stringify({
      fields: ['id', 'title', 'createdAt'],
      pagination: {
        page: (event.first || 0) / (event.rows || 5) + 1,
        pageSize: event.rows,
      },
      sort,
      populate: {
        'author': {
          fields: ['id'],
          populate: {
            'userExtended': { fields: ['firstName', 'lastName'] }
          }
        },
      },
    }, {
      encodeValuesOnly: true,
    });
    this.loadingData = true;
    this.newsService.find(query).subscribe({
      next: result => {
        this.news = result.data;
        this.totalRecords = result.meta.pagination.total;
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
      }

    });
  }
  public add() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'new', 'add'] } }])
  }

  public edit(news: INews) {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'new', 'edit', news.id] } }])
  }
}
