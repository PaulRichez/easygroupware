import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as QuillNamespace from 'quill';
import * as moment from 'moment';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  public form!: FormGroup;
  public sourceEvent: any;
  public modules = {
    imageResize: true
  }
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sourceEvent = this.config.data?.sourceEvent;
    if (this.config.data.event) {
      this.form = this.formBuilder.group({
        title: [this.config.data.event.title, Validators.required],
        start: [this.config.data.event.start, Validators.required],
        end: [this.config.data.event.end, Validators.required],
        description: [this.config.data.event.extendedProps.description, []],
        sourceEvent: [Number(this.config.data.event.source.id), Validators.required],
        allDay: [this.config.data.event.allDay, Validators.required],
        lieu: [this.config.data.event.lieu, [Validators.minLength(3)]],
      });
    } else {
      const roundedUp = Math.ceil(moment().minute() / 15) * 15;
      this.form = this.formBuilder.group({
        sourceEvent: [this.sourceEvent, [Validators.required]],
        lieu: ['', [Validators.minLength(3)]],
        description: ['', []],
        title: ['', [Validators.required, Validators.minLength(3)]],
        allDay: [false, [Validators.required]],
        start: [this.config.data?.start ? new Date(this.config.data.start) : moment().minute(roundedUp).second(0).toDate(), [Validators.required]],
        end: [this.config.data?.end ? new Date(this.config.data.end) : moment().minute(roundedUp).second(0).add(30, 'minute').toDate(), [Validators.required]],
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
  public deleteEvent() {
    this.ref.close({ delete: true });
  }
}
