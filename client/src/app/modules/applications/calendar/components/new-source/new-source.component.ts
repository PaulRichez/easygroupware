import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-new-source',
  templateUrl: './new-source.component.html',
  styleUrls: ['./new-source.component.scss']
})
export class NewSourceComponent implements OnInit {
  public form!: FormGroup;
  public typeSource: string[] = ['easyGroupware']
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.config?.data?.source)
    if (this.config?.data?.source) {
      this.form = this.formBuilder.group({
        name: [this.config.data.source.name, [Validators.required, Validators.minLength(3)]],
        type: [this.config.data.source.type, Validators.required],
        color: [this.config.data.source.color, Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        type: ['easyGroupware', [Validators.required]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        color: ['#000', [Validators.required]],
      });
    }
  }
  public onCancel(): void {
    this.ref.close();
  }

  public onSubmit(): void {
    if (!this.form.valid) return;
    this.ref.close(this.form.value);
  }

}
