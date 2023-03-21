import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { BlogAddDto } from 'src/app/models/blog/blog-add.model';
import { BlogListDto } from 'src/app/models/blog/blog-listing.model';
import { BlogService } from 'src/app/services/blog/blog.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog-setup',
  templateUrl: './blog-setup.component.html',
  styleUrls: ['./blog-setup.component.scss'],
})
export class BlogSetupComponent implements OnInit {
  defaultImageSrc = environment.defaultImageUrl;
  blogId: string = '';
  blogEmitter$ = new BehaviorSubject<BlogListDto>(null);
  blogDto: BlogListDto;
  isEdit: boolean = false;
  imageFormData = new FormData();
  imageFile!: File;
  imageSrcEmitter$ = new BehaviorSubject<string>(this.defaultImageSrc);
  blogAddForm: FormGroup;
  blogAddModel: BlogAddDto = new BlogAddDto();
  isSave$: Observable<boolean>;
  public Editor = ClassicEditor;
  showCloseButton: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public blogService: BlogService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.isSave$ = this.blogService.isSave$;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('userEmail');
    if (!token) {
      this.router.navigate(['login']);
    }
    
    this.initForm();

    this.blogId = this.activatedRoute.snapshot.queryParamMap.get('code') || '';

    if (this.blogId) {
      this.showCloseButton = true;
      this.isEdit = true;
      this.GetBlog();
    }
  }

  GetBlog() {
    this.blogService
      .GetBlogSetup(this.blogId)
      .pipe(first())
      .subscribe({
        next: (data) => {
          debugger;
          this.blogAddModel = data.data;
          if (data.data.imageUrl) {
            this.imageSrcEmitter$.next(environment.apiUrl + data.data.imageUrl);
          }

          this.blogAddForm.patchValue({
            title: this.blogAddModel.title,
            subTitle: this.blogAddModel.subTitle,
            description: this.blogAddModel.description,
            publish: this.blogAddModel.isPublish,
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  AddBlog() {
    this.ToFormData();
    this.blogService
      .AddBlog(this.imageFormData)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.toastr.success(data.message);
            this.router.navigate(['/admin/dashboard']);
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        },
      });
  }

  UpdateBlog() {
    this.ToFormData();
    this.blogService
      .UpdateBlog(this.imageFormData)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.toastr.success(data.message);
            this.router.navigate(['/admin/dashboard']);
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        },
      });
  }

  onFileChange(event) {
    this.showCloseButton = true;
    this.imageFile = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageSrcEmitter$.next(event.target.result);
      };
    }
  }

  prepareData() {
    this.blogAddModel.title = this.fields.title.value;
    this.blogAddModel.subTitle = this.fields.subTitle.value;
    this.blogAddModel.description = this.fields.description.value;
    this.blogAddModel.isPublish = this.fields.publish.value;
  }

  get fields() {
    return this.blogAddForm.controls;
  }

  initForm() {
    this.blogAddForm = this.fb.group({
      image: [],
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      subTitle: [
        '',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
      publish: [
        true,
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
    });
  }

  submit() {
    this.imageFormData = new FormData();
    this.prepareData();
    if (this.blogAddForm.invalid) {
      return;
    }
    if (this.isEdit) {
      this.UpdateBlog();
    } else {
      this.AddBlog();
    }
  }

  RemoveImage(element)
  {
    this.showCloseButton = false;
    element.value = "";
    this.imageSrcEmitter$.next(null);
  }

  ToFormData() {
    this.imageFormData.append('Data', JSON.stringify(this.blogAddModel));
    this.imageFormData.append('ProfileImage', this.imageFile);
  }

  onImgError(event) {
    this.showCloseButton = false;
    event.target.src = this.defaultImageSrc;
    // console.clear();
  }
}
