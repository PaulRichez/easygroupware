import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { NewsService } from 'src/app/core/services/news.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { INews } from 'src/app/shared/models/news.model';
import * as qs from 'qs'

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent extends AppHelperComponent implements OnInit {
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
      populate: {
        'author': {
          fields: ['id'],
          populate: {
            'userExtended': { fields: ['firstName', 'lastName'] }
          }
        },
      },
      sort,
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

  public show(news: INews) {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'dashboard', 'new', news.id] } }])
  }
}
