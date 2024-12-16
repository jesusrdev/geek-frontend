import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SharedService } from '../../../core/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Login, Token } from '../../../shared/interfaces/auth';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;

  hidePassword: boolean = true;

  showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: AuthService,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn(): void {
    this.showLoading = true;
    const request: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    this.userService.signIn(request).subscribe({
      next: response => {
        this.sharedService.setSession(response);

        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        const decodedToken: Token = jwtDecode(response.token);

        console.log(decodedToken);

        if (decodedToken.role == 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      complete: () => {
        this.showLoading = false;
      },
      error: error => {
        this.sharedService.showAlert(error.error, 'Error!');
        this.showLoading = false;
      }
    });
  }

  setHidePassword(value: boolean): void {
    this.hidePassword = value;
  }
}
