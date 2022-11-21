import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends AppHelperComponent implements OnInit {

  constructor(
    public override route: ActivatedRoute,
    private router: Router
  ) {
    super(route)
  }
  ngOnInit(): void {

  }

}
