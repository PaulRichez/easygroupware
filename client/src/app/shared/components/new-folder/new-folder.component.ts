import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {

  folderName!: string;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
   if (this.config.data?.name) {
      this.folderName = this.config.data.name;
   }
  }
  public onCancel(): void {
    this.ref.close();
  }

  public onSubmit(): void {
    this.ref.close(this.folderName);
  }
}
