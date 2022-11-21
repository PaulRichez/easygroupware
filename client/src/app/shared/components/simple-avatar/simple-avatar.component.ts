import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-avatar',
  templateUrl: './simple-avatar.component.html',
  styleUrls: ['./simple-avatar.component.scss']
})
export class SimpleAvatarComponent implements OnInit {
  @Input() name!: string;
  @Input() stringColor!: string;
  @Input() size!: string;
  @Input() styleClass!: string;
  label = '';
  constructor() { }

  ngOnInit(): void {
    this.label = this.name[0];
    if (!this.stringColor) {
      this.stringColor = this.name;
    }
  }

  stringToColour(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return `hsl(${(hash % 360)}, 100%, 30%)`;
  }
}
