import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DriveService } from 'src/app/core/services/drive.service';
import { GroupesService } from 'src/app/core/services/groupes.service';
import { UsersService } from 'src/app/core/services/users.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import byteSize from 'byte-size'
import { EmailStatsService } from 'src/app/core/services/email-stats.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends AppHelperComponent implements OnInit {
  statsCard: {
    icon: string;
    text: string;
    obs: Observable<number>;
  }[] = [
      {
        icon: 'fa-solid fa-users',
        text: 'Utilisateurs',
        obs: this.usersService.count()
      },
      {
        icon: 'fa-solid fa-user-group',
        text: 'Groupes',
        obs: this.groupesService.count()
      },
      {
        icon: 'fa-solid fa-floppy-disk',
        text: 'Drive moyen par utilisateur',
        obs: this.driveService.getAveragedDriveSize().pipe(map(value => byteSize(value * 1000, { units: 'metric_octet' })))
      },
      {
        icon: 'fa-brands fa-google-drive',
        text: 'Drive total',
        obs: this.driveService.getTotalDriveSize().pipe(map(value => byteSize(value * 1000, { units: 'metric_octet' })))
      },
      {
        icon: 'fa-solid fa-users-viewfinder',
        text: 'Compte emails',
        obs: this.emailStatsService.countAccounts()
      },
    ];
  constructor(
    private usersService: UsersService,
    private groupesService: GroupesService,
    private driveService: DriveService,
    private emailStatsService: EmailStatsService,
    public override route: ActivatedRoute,
  ) {
    super(route);
  }

  ngOnInit(): void {
  }

}
