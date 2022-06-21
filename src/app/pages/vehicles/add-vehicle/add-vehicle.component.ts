import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IVehicle } from 'src/app/core/interfaces/vehicles/vehicles.interface';

// Service
import { VehicleService } from 'src/app/core/services/vehicles/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
  public createVehicleForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddVehicleComponent>,
    private _fb: FormBuilder,
    private vehicleService: VehicleService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createVehicleForm = this.createVehicleFormulary();
  }

  get formValues() {
    return this.createVehicleForm.value as IVehicle;
  }

  createVehicleFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
      year: ['', Validators.required],
      make: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }

  createVehicle(): void {
    this.vehicleService.createVehicle(this.formValues).subscribe((response) => {
      if (response.status) {
        this._snackBar.open('Driver created successfully');
        this.dialogRef.close(true);
      } else {
        this._snackBar.open('An error has ocurred, please try again');
      }
    });
  }
}
