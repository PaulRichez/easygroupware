import { Injectable } from '@angular/core';
import byteSize from 'byte-size'
import { SortEvent } from 'primeng/api';
import { IFileQueue } from 'src/app/shared/models/files-queue.model';
@Injectable({
  providedIn: 'root'
})
export class FilesHelperService {
  public eventSort!: SortEvent;
  constructor() { }

  getByteSizeTransfet(entry: IFileQueue) {
    if (entry.type == 'download') {
      return this.getByteSizeFile(entry.data)
    } else {
      return this.getByteSizeFileUpload(entry.data)
    }
  }
  getByteSizeEntry(entry) {
    if (!entry.url) {
      return `${entry?.children?.count} dossiers / ${entry?.files?.count} fichiers`
      return '-';
    } else {
      return byteSize(entry.size * 1000, { units: 'metric_octet' });
    }
  }
  getByteSizeFile(file: File) {
    return byteSize(file.size * 1000, { units: 'metric_octet' });
  }

  getByteSizeFileUpload(file: File) {
    return byteSize(file.size, { units: 'metric_octet' });
  }

  getIconFile(file: File) {
    const fileExtension = file.name.split('.').pop();
    return this.getIconByExt('.' + fileExtension);
  }

  getIconEntry(entry) {
    if (!entry?.url) {
      return 'fa fa-folder';
    } else {
      return this.getIconByExt(entry.ext);
    }
  }

  customSort(event?: SortEvent) {
    if (event) {
      this.eventSort = event;
    }
    if (!this.eventSort) {
      return;
    }
    this.eventSort.data?.sort((a, b) => {
      let value1 = a[this.eventSort.field || 'name'];
      let value2 = b[this.eventSort.field || 'name'];
      let result;
      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      return (
        (!a.url ? -1 : 1) - (!b.url ? -1 : 1) ||
        (this.eventSort.order || 1) * result
      );
    });
  }

  private getIconByExt(ext) {
    switch (ext) {
      case '.eml':
        return 'fa fa-envelope';
        break;
      case '.ics':
        return 'fa fa-calendar';
        break;
      case '.pdf':
        return 'fa fa-file-pdf';
        break;
      case '.doc':
        return 'fa fa-file-word';
        break;
      case '.docx':
        return 'fa fa-file-word';
        break;
      case '.xls':
        return 'fa fa-file-excel';
        break;
      case '.xlsx':
        return 'fa fa-file-excel';
        break;
      case '.ppt':
        return 'fa fa-file-powerpoint';
        break;
      case '.pptx':
        return 'fa fa-file-powerpoint';
        break;
      case '.jpg':
        return 'fa fa-file-image';
        break;
      case '.png':
        return 'fa fa-file-image';
        break;
      case '.gif':
        return 'fa fa-file-image';
        break;
      case '.zip':
        return 'fa fa-file-archive';
        break;
      case '.rar':
        return 'fa fa-file-archive';
        break;
      case '.txt':
        return 'fa fa-file-text';
        break;
      case '.mp3':
        return 'fa fa-file-audio';
        break;
      case '.wav':
        return 'fa fa-file-audio';
        break;
      case '.mp4':
        return 'fa fa-file-video';
        break;
      case '.avi':
        return 'fa fa-file-video';
        break;
      case '.mkv':
        return 'fa fa-file-video';
        break;
      case '.mov':
        return 'fa fa-file-video';
        break;
      case '.flv':
        return 'fa fa-file-video';
        break;
      case '.wmv':
        return 'fa fa-file-video';
        break;
      case '.mpg':
        return 'fa fa-file-video';
        break;
      case '.mpeg':
        return 'fa fa-file-video';
        break;
      case '.flv':
        return 'fa fa-file-video';
        break;
      case '.webm':
        return 'fa fa-file-video';
        break;
      case '.m4v':
        return 'fa fa-file-video';
        break;
      case '.m4a':
        return 'fa fa-file-audio';
        break;
      default:
        return 'fa fa-file';
        break;
    }
  }
}