import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupesService } from 'src/app/core/services/groupes.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { IUserGroup } from 'src/app/shared/models/user-group.model';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent extends AppHelperComponent implements OnInit {
  public group!: IUserGroup;
  public loadingData = true;
  public loadingSave = false;
  public idGroup!: string;
  public formGroup!: FormGroup;
  constructor(
    public override route: ActivatedRoute,
    private router: Router,
    private groupesService: GroupesService,
    private formBuilder: FormBuilder,
  ) {
    super(route);
  }
  ngOnInit(): void {
    this.setForm();
    this.idGroup = this.route.snapshot.params['id'];
    if (this.idGroup) {
      this.groupesService.findOne(this.idGroup).subscribe({
        next: result => {
          this.group = result.data;
          this.loadingData = false;
          this.setForm();
        },
        error: err => {
          this.loadingData = false;
        }
      })
    } else {
      this.loadingData = false;
      this.setForm();
    }
  }

  setForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.group?.name, [Validators.required, Validators.minLength(3)]],
      description: [this.group?.description, []],
    });
    this.formGroup.disable();
    if (!this.loadingData) {
      setTimeout(() =>
        this.formGroup.enable(), 1
      )
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.formGroup.disable();
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.formGroup.value));
    let action = this.groupesService.create(formData)
    if (this.idGroup) {
      action = this.groupesService.update(this.group.id, formData);
    }
    action.subscribe(
      {
        next: data => {
          this.loadingSave = false;
          this.formGroup.enable();
        },
        error: err => {
          this.loadingSave = false;
          this.formGroup.enable();
        }
      }
    );
  }

  goBack() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'group'] } }])
  }

}
