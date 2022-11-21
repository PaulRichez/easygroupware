import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultConfigService } from 'src/app/core/services/default-config.service';

@Component({
  selector: 'app-config-drive',
  templateUrl: './config-drive.component.html',
  styleUrls: ['./config-drive.component.scss']
})
export class ConfigDriveComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private defaultConfigService: DefaultConfigService
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      driveLimitSize: [this.defaultConfigService.defaultConfig?.driveLimitSize, [Validators.required, Validators.min(50)]]
    });
  }
  onSubmit() {
    if (this.form.invalid) return;
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.form.value));
    this.defaultConfigService.update(formData).subscribe();
  }
}
