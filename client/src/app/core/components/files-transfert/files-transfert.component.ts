import { Component, OnInit } from '@angular/core';
import { FilesHelperService } from '../../services/files-helper.service';
import { FilesTransfertService } from '../../services/files-transfert.service';


@Component({
  selector: 'app-files-transfert',
  templateUrl: './files-transfert.component.html',
  styleUrls: ['./files-transfert.component.scss']
})
export class FilesTransfertComponent implements OnInit {

  constructor(
    public filesTransfert: FilesTransfertService,
    public filesHelperService: FilesHelperService,
  ) { }

  ngOnInit(): void {
  }

}
