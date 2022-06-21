import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

// Custom
import { IDriver } from 'src/app/core/interfaces/drivers/drivers.interface';
import { DriversService } from 'src/app/core/services/drivers/drivers.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss'],
})
export class EditDriverComponent implements OnInit {
  public updateDriverForm!: FormGroup;
  public idDriver: string = '';
  public driverName: string = '';

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private driverService: DriversService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idDriver = id));
  }

  ngOnInit(): void {
    this.updateDriverForm = this.createDriverFormulary();

    this.driverService
      .getDriverById(this.idDriver)
      .subscribe(({ document }) => {
        // This to exclude the necessary properties from the response
        const excludeFields = ['_id', 'active', 'createdAt', '__v'];

        Object.keys(document).forEach((key) => {
          if (excludeFields.includes(key)) {
            return;
          } else if (key === 'firstName') {
            this.driverName = document[key];
          }

          this.updateDriverForm.controls[key].setValue(document[key]);
        });
      });
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

  get formValues(): IDriver {
    return this.updateDriverForm.value;
  }

  updateDriver(): void {
    this.driverService
      .updateDriver(this.idDriver, this.formValues)
      .subscribe((response) => {
        if (response.status) {
          this._snackBar.open('Driver updated successfully');
          this.router.navigate(['/platform/drivers']);
        }
      });
  }

  deleteDriver(): void {
    this.driverService.deleteDriver(this.idDriver).subscribe(() => {
      this._snackBar.open('Driver deleted successfully');
      this.router.navigate(['/platform/drivers']);
    });
  }

  onBack(): void {
    this.location.back();
  }
}
