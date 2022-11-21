import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compose-attachments',
  templateUrl: './compose-attachments.component.html',
  styleUrls: ['./compose-attachments.component.scss']
})
export class ComposeAttachmentsComponent implements OnInit {
  @Input() files!: any[];
  constructor() { }

  ngOnInit(): void {
  }

  private getBase64(fileAdvanced: any) {
    fileAdvanced.reader.readAsDataURL(fileAdvanced.file);
    fileAdvanced.reader.onprogress = (event) => {
      fileAdvanced.uploadProgress = Math.round(event.loaded / event.total * 100)
      fileAdvanced.uploading = true;
    }
    fileAdvanced.reader.onload = function () {
      fileAdvanced.uploaded = true;
      fileAdvanced.uploading = false;
      fileAdvanced.uploadProgress = 100;
    };
    fileAdvanced.reader.onerror = function (error) {
      fileAdvanced.error = true;
    };
  }

  upload(event, fileInput) {
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      console.log(files[i].size)
      let file = files[i];
      const fileAdvanced = {
        file,
        reader: new FileReader(),
        uploaded: false,
        error: false,
        uploading: false,
        uploadProgress: 0,
      }
      this.files.push(fileAdvanced)
      this.getBase64(fileAdvanced);
    };
    // fileInput.value = ''
  }

  removeFile(index: number) {
    this.files[index].reader.abort();
    this.files.splice(index, 1);
  }

}
