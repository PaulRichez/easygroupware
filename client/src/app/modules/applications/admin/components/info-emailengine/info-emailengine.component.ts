import { Component, OnInit } from '@angular/core';
import { EmailStatsService } from 'src/app/core/services/email-stats.service';

@Component({
  selector: 'app-info-emailengine',
  templateUrl: './info-emailengine.component.html',
  styleUrls: ['./info-emailengine.component.scss']
})
export class InfoEmailengineComponent implements OnInit {
  public loading = true;
  public error = false;
  public stats: any;
  constructor(
    private emailStatsService: EmailStatsService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.emailStatsService.get().subscribe({
      next: value => {
        this.stats = value;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
        this.error = true
      }
    })
  }
}
