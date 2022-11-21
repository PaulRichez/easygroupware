import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {
  @Input() icon!: string;
  @Input() text!: string;
  @Input() obs!: Observable<number>;
  public loadingData = true;
  public count!: string;
  constructor() { }

  ngOnInit(): void {
    this.obs.subscribe({
      next: result => {
        this.count = result.toString();
        this.loadingData = false;
      }
    })
  }

}

