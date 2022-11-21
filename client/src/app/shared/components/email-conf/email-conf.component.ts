import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-conf',
  templateUrl: './email-conf.component.html',
  styleUrls: ['./email-conf.component.scss']
})
export class EmailConfComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() header!: string;
  constructor() { }

  ngOnInit(): void {
  }

  getFormTls() {
    return this.form.get('tls') as FormGroup;
  }

}
