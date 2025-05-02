import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SharedService } from '../../../core/services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { SignUp, Token } from '../../../shared/interfaces/auth';
import { jwtDecode } from 'jwt-decode';

import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel, MatInput, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  imports: [
    MatProgressBar,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatIconButton,
    ButtonComponent
  ]
})
export class SignUpComponent {
  formSignUp: FormGroup;

  hidePassword: boolean = true;

  showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: AuthService,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {
    this.formSignUp = this.fb.group({
      userName: ['', Validators.required],
      names: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['User']
    });
  }

  signUp(): void {
    this.showLoading = true;
    const request: SignUp = {
      userName: this.formSignUp.value.userName,
      names: this.formSignUp.value.names,
      lastName: this.formSignUp.value.lastName,
      email: this.formSignUp.value.email,
      password: this.formSignUp.value.password,
      role: this.formSignUp.value.role
    };

    this.userService.signUp(request).subscribe({
      next: response => {
        this.sharedService.setSession(response);

        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        const decodedToken: Token = jwtDecode(response.token);

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
        this.sharedService.showAlert(JSON.stringify(error.error), 'Error!');
        this.showLoading = false;
      }
    });
  }

  setHidePassword(value: boolean): void {
    this.hidePassword = value;
  }
}
