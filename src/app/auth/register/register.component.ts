import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

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
}
