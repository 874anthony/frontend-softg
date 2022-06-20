// Built-in Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { MaterialModule } from '../material/material.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
