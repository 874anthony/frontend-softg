import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent implements OnInit {
  public createDriverForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDriverComponent>
  ) {}

  ngOnInit(): void {
    this.createDriverForm = this.createDriverFormulary();
  }

  createDriverFormulary(): FormGroup {
    return this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      ssn: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
}
