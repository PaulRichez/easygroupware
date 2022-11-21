import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from '../../authentification/authentification.service';
import { ApplicationsService } from '../../services/applications.service';
import { DefaultConfigService } from '../../services/default-config.service';
import { MainSidebarService } from '../../services/main-sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  apiUrl = environment.apiUrl;
  constructor(
    public applicationsService: ApplicationsService,
    public defaultConfigService: DefaultConfigService,
    public authentificationService: AuthentificationService,
    public mainSidebarService: MainSidebarService,
  ) { }

  ngOnInit(): void {
  }

}
