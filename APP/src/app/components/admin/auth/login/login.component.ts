import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  loginData: UserModel = new UserModel();
  showNewPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService
  ) {
    this.isLoading$ = this.adminService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();

    const token = localStorage.getItem('userEmail');
    if (token) {
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  PrepareData() {
    this.loginData.email = this.f.email.value;
    this.loginData.password = this.f.password.value;
  }

  Submit() {
    this.PrepareData();

    if (this.loginForm.invalid) {
      return;
    }

    this.adminService
      .Login(this.loginData)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.toastr.error(data.message);
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        },
      });
  }

  public ToggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  ngOnDestroy() {}
}
