import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthentificationService } from '../../authentification/authentification.service';
import { ApplicationsService } from '../../services/applications.service';
import { FilesTransfertService } from '../../services/files-transfert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.redrawTabsWidth()
  }
  @Output() toggleSidebar = new EventEmitter();
  @ViewChild('avatarDiv') avatarDiv!: ElementRef;
  @ViewChild('parentDiv') parentDiv!: ElementRef;
  @ViewChild('buttonToggleSidebar') buttonToggleSidebar!: ElementRef;
  public activeIndex!: number;
  public items: MenuItem[] = [
    {
      label: 'Mon profil',
      icon: 'pi pi-user',
      command: () => { this.applicationsService.openNewApplication('profile'); }
    },
    {
      label: 'Se déconnecter',
      icon: 'pi pi-sign-out',
      command: () => { this.authentificationService.logout()}
    }
  ];
  private sub!: any;
  constructor(
    public applicationsService: ApplicationsService,
    public authentificationService: AuthentificationService,
    private router: Router,
    public filesTransfert: FilesTransfertService
  ) { }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.redrawTabsWidth()
  }

  redrawTabsWidth() {
    setTimeout(() => {
      document.documentElement.style.setProperty(`--headerTabsWidth`, this.parentDiv.nativeElement.offsetWidth - this.avatarDiv.nativeElement.offsetWidth - this.buttonToggleSidebar.nativeElement.offsetWidth + 'px');
    });
  }

  ngOnInit(): void {
    this.authentificationService.observableconnectedUser.subscribe((user) => {
      this.redrawTabsWidth();
    });
    this.sub = this.applicationsService.applicaitonChangeSubject.subscribe((tab) => {
      setTimeout(() => {
        this.activeIndex = tab?.index || 0;
      }, 1)
    })
  }

  handleChange(event: any) {
    this.applicationsService.selectApp(this.applicationsService.applicationsTab[event.index])
  }

  toggleSidebarEmit() {
    this.toggleSidebar.emit();
    this.redrawTabsWidth();
  }

}