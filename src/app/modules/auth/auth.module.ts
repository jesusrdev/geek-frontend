import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material/material.module';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from '../../core/services/auth.service';

@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  providers: [AuthService],
  exports: [SignUpComponent, LoginComponent]
})
export class AuthModule {}
