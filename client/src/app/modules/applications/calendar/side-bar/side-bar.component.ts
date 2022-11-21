import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventSourceService } from 'src/app/core/services/event-source.service';
import { MainSidebarService } from 'src/app/core/services/main-sidebar.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { NewSourceComponent } from '../components/new-source/new-source.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [DialogService]
})
export class SideBarComponent extends AppHelperComponent implements OnInit, OnDestroy {
  public loadingData = true;
  private ref!: DynamicDialogRef;
  eventSources: any[] = [];
  constructor(
    public dialogService: DialogService,
    private eventSourceService: EventSourceService,
    public override route: ActivatedRoute,
    public mainSidebarService: MainSidebarService,
  ) {
    super(route)
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loadingData = true;
    this.eventSourceService.find().subscribe({
      next: result => {
        if (result.data.length > 0) {
          result.data.forEach(s => this.putRouterLinkOnSource(s))
        }
        this.eventSources = result.data;
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
      }

    });
  }

  private putRouterLinkOnSource(source: any) {
    source.routerLink = ['', { outlets: { [this.appOutlet as string]: ['tab', 'calendar', source.id] } }]
  }


  editSource(oldSource: any) {
    this.ref = this.dialogService.open(NewSourceComponent, {
      header: 'Ajouter un nouveau calendrier',
      data: {
        source: oldSource
      },
      baseZIndex: 9000
    });

    this.ref.onClose.subscribe((source: any) => {
      if (source) {
        source.id = oldSource.id;
        this.eventSourceService.update(source).subscribe((response) => {
          this.eventSources.find((sourceEvent) => sourceEvent.id === oldSource.id).name = source.name;
          this.eventSources.find((sourceEvent) => sourceEvent.id === oldSource.id).textColor = source.textColor;
          this.eventSources.find((sourceEvent) => sourceEvent.id === oldSource.id).color = source.color;
        });
      }
    });
  }
  createNewSourceEvents() {
    this.ref = this.dialogService.open(NewSourceComponent, {
      header: 'Créer un nouveau calendrier',
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((source: any) => {
      if (source) {
        this.eventSourceService.create(source).subscribe((response) => {
          console.log(response);
        });
      }
    });
  }
}
