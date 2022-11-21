import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  @Output() click = new EventEmitter();
  constructor(
    public applicationsService: ApplicationsService,
  ) { }

  ngOnInit(): void {
  }

}
