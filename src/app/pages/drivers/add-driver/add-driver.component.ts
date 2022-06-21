import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Custom
import { IDriver } from 'src/app/core/interfaces/drivers/drivers.interface';
import { DriversService } from 'src/app/core/services/drivers/drivers.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent implements OnInit {
  public createDriverForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddDriverComponent>,
    private _fb: FormBuilder,
    private driverService: DriversService,
    private _snackBar: MatSnackBar
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

  get formValues() {
    return this.createDriverForm.value as IDriver;
  }

  createDriver(): void {
    this.driverService.createDriver(this.formValues).subscribe((response) => {
      if (response.status) {
        this._snackBar.open('Driver created successfully');
        this.dialogRef.close(true);
      } else {
        this._snackBar.open('An error has ocurred, please try again');
      }
    });
  }
}
