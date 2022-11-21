import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveService } from 'src/app/core/services/drive.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

import { IFolder } from 'src/app/shared/models/folder.model';
import { FilesHelperService } from 'src/app/core/services/files-helper.service';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-file-table-view',
  templateUrl: './file-table-view.component.html',
  styleUrls: ['./file-table-view.component.scss']
})
export class FileTableViewComponent extends AppHelperComponent implements OnInit, OnChanges {
  @Input() selectedFolderId!: string;
  @Input() loadingData = true;
  @Input() folder!: IFolder;
  @Input() showSelectedEntryInfo!: boolean;
  @Input() selectedEntry!: IFolder | any;
  @Output() dbClick = new EventEmitter<any>();
  @Output() renameEntry = new EventEmitter<IFolder | any>();
  @Output() showInfoEntry = new EventEmitter<IFolder | any>();
  @Output() downloadEntry = new EventEmitter<any>();
  @Output() deleteEntry = new EventEmitter<IFolder | any>();
  directoryData!: IFolder[] | any[];
  itemsEntry!: any;
  constructor(
    public override route: ActivatedRoute,
    private router: Router,
    private driveService: DriveService,
    public filesHelper: FilesHelperService
  ) {
    super(route)
  }

  ngOnInit(): void {
  }
  createMenuItems(entry: IFolder | any) {
    this.itemsEntry = [
      {
        label: 'Ouvrir', icon: 'fa fa-folder-open', command: (event) => { this.dbClick.emit(entry) }, visible: !entry.url
      },
      {
        separator: true, visible: !entry.file
      },
      {
        label: 'Renommer', icon: 'fa fa-edit', command: (event) => { this.renameEntry.emit(entry) }
      },
      /* {
         label: 'Déplacer', icon: 'fa fa-folder-open', command: (event) => { this.moveEntry() }
       },*/
      {
        separator: true,
      },
      {
        label: 'Afficher les détails', icon: 'fa fa-circle-info', command: (event) => { this.showInfoEntry.emit(entry) }
      },
      {
        label: 'Télécharger', icon: 'fa fa-download', command: (event) => { this.downloadEntry.emit(entry) }, visible: !!entry.url
      },
      {
        separator: true,
      },
      {
        label: 'Supprimer', icon: 'fa fa-trash', command: (event) => { this.deleteEntry.emit(entry) }
      },
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folder']) {
      this.directoryData = [];
      if (this.folder?.children) {
        (this.folder.children as IFolder[]).forEach(f => this.directoryData.push(f))
      }
      if (this.folder?.files) {
        (this.folder.files as any[]).forEach(f => this.directoryData.push(f))
      }
      if (this.showSelectedEntryInfo && !this.selectedEntry) {
        this.showInfoEntry.emit(this.directoryData[0])
      }
    }
  }

  clickRow(entry) {
    if (this.showSelectedEntryInfo) {
      this.showInfoEntry.emit(entry)
    }
  }
  customSort(event: SortEvent) {
    this.filesHelper.customSort(event);
  }
}
