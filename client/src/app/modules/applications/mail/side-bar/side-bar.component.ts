import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { EmailMailboxesService } from 'src/app/core/services/email-mailboxes.service';
import { MainSidebarService } from 'src/app/core/services/main-sidebar.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent extends AppHelperComponent implements OnInit {
  loadingData = true;
  mailboxes: any[] = [];
  public selectedBox: any;
  constructor(
    private emailMailboxesService: EmailMailboxesService,
    private router: Router,
    private mainSidebarService: MainSidebarService,
    public override route: ActivatedRoute
  ) {
    super(route)
  }

  ngOnInit(): void {
    this.fetchMailboxes();
  }

  fetchMailboxes(): void {
    this.loadingData = true;
    this.emailMailboxesService.find().subscribe({
      next: result => {
        if (result.mailboxes.length > 0) {
          result.mailboxes.forEach(m => this.putRouterLinkOnMailbox(m))
        }
        this.mailboxes = this.createDataTree(result.mailboxes);
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
      }
    })
  }

  private putRouterLinkOnMailbox(mailbox: any) {
    mailbox.routerLink = ['', { outlets: { [this.appOutlet as string]: ['tab', 'mail', 'mailbox', mailbox.path] } }]
  }


  createDataTree(dataset: any[]) {
    const newData = (aData) => {
      aData.path = encodeURIComponent(aData.path)
      return aData;
    };
    const hashTable = Object.create(null);
    dataset.forEach(aData => {
      hashTable[aData.path] = { ...aData }
      if (dataset.filter(aData2 => aData2.parentPath === aData.path).length > 0) {
        hashTable[aData.path].children = [];
      }
    });
    const dataTree: TreeNode[] = [];
    dataset.forEach(aData => {
      if (aData.parentPath) {
        hashTable[aData.parentPath].children.push({ children: hashTable[aData.path].children, label: aData.name, data: newData({ ...aData }) });
      } else {
        dataTree.push({ children: hashTable[aData.path].children, label: aData.name, data: newData({ ...aData }) });
      }
    });
    return dataTree;
  };

  nodeSelect(event) {
    const path = event.node.data.path;
    this.selectedBox = event.node;
    this.router.navigate(['', { outlets: { [this.appOutlet as string]: ['tab', 'mail', 'mailbox', path] } }]);
    this.mainSidebarService.closeSidebarIfMobile();
  }
}
