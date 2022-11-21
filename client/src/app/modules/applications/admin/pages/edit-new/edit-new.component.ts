import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/core/services/news.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { INews } from 'src/app/shared/models/news.model';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.scss']
})
export class EditNewComponent extends AppHelperComponent implements OnInit {
  public news!: INews;
  public loadingData = true;
  public loadingSave = false;
  public idNews!: string;
  public formNews!: FormGroup;
  public modules: any = {
    imageResize: true
  }
  constructor(
    public override route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
  ) {
    super(route);
  }

  ngOnInit(): void {
    this.setForm();
    this.idNews = this.route.snapshot.params['id'];
    if (this.idNews) {
      this.newsService.findOne(this.idNews).subscribe({
        next: result => {
          this.news = result.data;
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
    this.formNews = this.formBuilder.group({
      title: [this.news?.title, [Validators.required, Validators.minLength(3)]],
      content: [this.news?.content, [Validators.required]],
      author: [this.authentificationService.connectedUser.id]
    });
    this.formNews.disable();
    if (!this.loadingData) {
      setTimeout(() =>
        this.formNews.enable(), 1
      )
    }
  }

  onSubmit() {
    if (this.formNews.invalid) {
      return;
    }
    this.formNews.disable();
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.formNews.value));
    let action = this.newsService.create(formData)
    if (this.idNews) {
      action = this.newsService.update(this.news.id, formData);
    }
    action.subscribe(
      {
        next: data => {
          this.loadingSave = false;
          if (this.idNews) {
            this.formNews.enable();
          } else {
            this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'new', 'edit', data.data.id] } }])
          }
        },
        error: err => {
          this.loadingSave = false;
          this.formNews.enable();
        }
      }
    );
  }


  goBack() {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'admin', 'new'] } }])
  }

}
