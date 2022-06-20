import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userForm!: FormGroup;

  constructor(private _fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.userForm = this.createUserForm();
  }

  createUserForm(): FormGroup {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formValues() {
    return this.userForm.value as { email: string; password: string };
  }

  logIn() {
    // TODO: Redirect when login is successful
    this.authService.logIn(this.formValues).subscribe(console.log);
  }
}
