import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/core/services/news.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { INews } from 'src/app/shared/models/news.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent extends AppHelperComponent implements OnInit, OnDestroy {
  public loadingData = true;
  public news!: INews;
  totalRecords = 0;
  private subNew: any;
  private subNewParam: any;
  constructor(
    private newsService: NewsService,
    public override route: ActivatedRoute,
    private router: Router,
  ) {
    super(route);
  }
  ngOnDestroy() {
    if (this.subNew) {
      this.subNew.unsubscribe();
    }
    if (this.subNewParam) {
      this.subNewParam.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subNewParam = this.route.params.subscribe((p) => this.fetchData(p['id']))
  }

  fetchData(id: string) {
    this.newsService.findOne(id).subscribe({
      next: result => {
        this.news = result.data;
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
      }
    })
  }

  goBack() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'dashboard'] } }])
  }
}
