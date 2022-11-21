import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() title!: string;
  @Input() accept: string = '*';
  @Input() multiple: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
