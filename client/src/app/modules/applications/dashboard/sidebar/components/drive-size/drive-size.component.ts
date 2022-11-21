import { Component, OnDestroy, OnInit } from '@angular/core';
import { DriveService } from 'src/app/core/services/drive.service';
import byteSize from 'byte-size'
import { DefaultConfigService } from 'src/app/core/services/default-config.service';

@Component({
  selector: 'app-drive-size',
  templateUrl: './drive-size.component.html',
  styleUrls: ['./drive-size.component.scss']
})
export class DriveSizeComponent implements OnInit, OnDestroy {
  private subUsed: any;
  public usedSize = '--';
  constructor(
    public driveService: DriveService,
    public defaultConfigService: DefaultConfigService
  ) { }
  ngOnDestroy() {
    if (this.subUsed) this.subUsed.unsubscribe();
  }
  ngOnInit(): void {
    this.subUsed = this.subUsed = this.driveService.getmyDriveSize().subscribe({
      next: value => {
        this.usedSize = byteSize(value * 1000, { units: 'metric_octet' });
      },
      error: err => {

      },
    })
  }

}
