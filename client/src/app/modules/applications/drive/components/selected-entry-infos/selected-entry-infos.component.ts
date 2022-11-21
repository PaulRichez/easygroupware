import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FilesHelperService } from 'src/app/core/services/files-helper.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-selected-entry-infos',
  templateUrl: './selected-entry-infos.component.html',
  styleUrls: ['./selected-entry-infos.component.scss']
})
export class SelectedEntryInfosComponent implements OnInit, OnChanges {
  @Input() selectedEntry;
  @Output() close = new EventEmitter();
  public preview = false;
  constructor(
    public filesHelperService: FilesHelperService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.preview = false;
    if (this.selectedEntry?.url) {
      this.preview = true;
    }
  }

  getThumbnail() {
    let url = this.selectedEntry.url;
    if (this.selectedEntry?.formats['thumbnail']) {
      url = this.selectedEntry?.formats['thumbnail'].url;
    }
    return environment.apiUrl + url
  }

  blobToDataURL(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = _e => resolve(reader.result as string);
      reader.onerror = _e => reject(reader.error);
      reader.onabort = _e => reject(new Error("Read aborted"));
      reader.readAsDataURL(blob);
    });
  }


}
