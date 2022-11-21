import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MessageContentComponent implements OnInit {
  @Input() mail!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
