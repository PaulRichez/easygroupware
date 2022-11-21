import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstallationService } from 'src/app/core/services/installation.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private installationService: InstallationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  start() {
    this.installationService.currentStep = 1;
    this.router.navigate(['/setup/steps'])
  }
}
