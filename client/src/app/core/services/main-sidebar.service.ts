import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainSidebarService {
  displaySidebar = false;
  constructor() { }

  closeSidebar() {
    this.displaySidebar = false;
  }
  closeSidebarIfMobile() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) this.displaySidebar = false;
  }

  openSidebar() {
    this.displaySidebar = true;
  }
}
