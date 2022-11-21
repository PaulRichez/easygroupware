import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  public themeList = [
    {
      name: 'Clair',
      value: 'light'
    },
    {
      name: 'Sombre',
      value: 'dark',
    },
    {
      name: 'Blue dark',
      value: 'blue'
    }
  ]

  public set current(value: string) {
    this.style.href = `/${value}.css`;
  }

  private readonly style: HTMLLinkElement;

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);
  }
}
