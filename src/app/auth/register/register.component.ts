import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(private _fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registrationForm = this.createRegistrationForm();
  }

  createRegistrationForm(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formValues() {
    return this.registrationForm.value;
  }

  createUser() {
    // TODO: Redirect to dashboard page
    this.authService.createUser(this.formValues).subscribe(console.log);
  }
}
