import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IVehicle } from 'src/app/core/interfaces/vehicles/vehicles.interface';

// Custom
import { VehicleService } from 'src/app/core/services/vehicles/vehicle.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
  public updateVehicleForm!: FormGroup;
  public idVehicle: string = '';

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idVehicle = id));
  }

  ngOnInit(): void {
    this.updateVehicleForm = this.createVehicleFormulary();

    this.vehicleService
      .getVehicleById(this.idVehicle)
      .subscribe(({ document }) => {
        // This to exclude the necessary properties from the response
        const excludeFields = ['_id', 'active', 'createdAt', '__v'];

        Object.keys(document).forEach((key) => {
          if (excludeFields.includes(key)) {
            return;
          }

          this.updateVehicleForm.controls[key].setValue(document[key]);
        });
      });
  }

  createVehicleFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
      year: ['', Validators.required],
      make: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }

  get formValues(): IVehicle {
    return this.updateVehicleForm.value;
  }

  updateVehicle(): void {
    this.vehicleService
      .updateVehicle(this.idVehicle, this.formValues)
      .subscribe((response) => {
        if (response.status) {
          this._snackBar.open('Vehicle updated successfully');
          this.router.navigate(['/platform/vehicles']);
        }
      });
  }

  deleteVehicle(): void {
    this.vehicleService.deleteVehicle(this.idVehicle).subscribe(() => {
      this._snackBar.open('Vehicle deleted successfully');
      this.router.navigate(['/platform/vehicles']);
    });
  }

  onBack(): void {
    this.location.back();
  }
}
