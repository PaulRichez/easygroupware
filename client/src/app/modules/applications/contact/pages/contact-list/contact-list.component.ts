import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ContactService } from 'src/app/core/services/contact.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import { IContact } from 'src/app/shared/models/contact.model';
import { TreeNode } from 'primeng/api';
import * as _ from "lodash";
import * as objectPath from "object-path";
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends AppHelperComponent implements OnInit {
  public loadingData = true;
  public contacts: IContact[] = [];
  public addRoutlet!: any;
  public selectedColumnsTree: TreeNode[] = [];
  public columnsTree: TreeNode[] = [
    {
      key: 'fullName',
      label: 'Nom Complet',
      children: [
        { label: 'Civilité', data: 'name.civility' },
        { label: 'Nom', data: 'name.firstName' },
        { label: 'Prénom', data: 'name.lastName' },
      ]
    },
    {
      key: 'proInfo',
      label: 'Informations Profesionel',
      children: [
        {
          key: 'contact',
          label: 'Contact',
          children: [
            { label: 'Téléphone Mobile', data: 'pro.contacts.mobilePhone' },
            { label: 'Téléphone Fixe', data: 'pro.contacts.fixPhone' },
            { label: 'Autre téléphone', data: 'pro.contacts.otherPhone' },
            { label: 'Email', data: 'pro.contacts.url' },
            { label: 'Url', data: 'pro.contacts.email' },
          ]
        },
        {
          label: 'adresse',
          key: 'Adresse',
          children: [
            { label: 'Pays', data: 'pro.address.country.name' },
            { label: 'Ville', data: 'pro.address.city.name' },
          ]
        },
        {
          label: 'Role', data: 'pro.role'
        }
      ]
    }
  ];
  totalRecords = 0;
  constructor(
    private contactService: ContactService,
    public override route: ActivatedRoute,
    private router: Router
  ) {
    super(route)
  }

  ngOnInit(): void {
    this.selectedColumnsTree = this.preselectColums(this.columnsTree);
  }



  preselectColums(tree: TreeNode[], parent?: TreeNode) {
    const arr: TreeNode[] = [];
    tree.forEach(node => {
      node.parent = parent;
      arr.push(node);
      if (node.children) {
        this.preselectColums(node.children, node).forEach(n => arr.push(n))
      }
    })
    return arr;
  }

  changeColumnSelectedTree(event: any) {
  }


  fetchContact(event: LazyLoadEvent) {
    const sort = event.sortField ? [`${event.sortField}:${event.sortOrder === 1 ? 'asc' : 'desc'}`] : {};
    const query = qs.stringify({
      pagination: {
        page: (event.first || 0) / (event.rows || 5) + 1,
        pageSize: event.rows,
      },
      sort,
      populate: ['deep'],
    }, {
      encodeValuesOnly: true,
    });
    this.contacts = [];
    this.loadingData = true;
    this.contactService.find(query).subscribe({
      next: result => {
        this.contacts = result.data;
        this.totalRecords = result.meta.pagination.total;
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
      }

    });
  }

  public add() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'contact', 'add'] } }])
  }

  public edit(contact: IContact) {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab','contact', 'edit', contact.id] } }])
  }

  getColumn() {
    return this.selectedColumnsTree.filter(column => !!column.data)
  }
  getContactBypath(contact: IContact, col: any) {
    return objectPath.get(contact, col.data);
  }
}