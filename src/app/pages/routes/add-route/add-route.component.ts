import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';

// Custom
import { IRoutes } from 'src/app/core/interfaces/routes/route.interface';
import { IDriver } from 'src/app/core/interfaces/drivers/drivers.interface';
import { IVehicle } from 'src/app/core/interfaces/vehicles/vehicles.interface';

import { RouteService } from 'src/app/core/services/routes/route.service';
import { DriversService } from 'src/app/core/services/drivers/drivers.service';
import { VehicleService } from 'src/app/core/services/vehicles/vehicle.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss'],
})
export class AddRouteComponent implements OnInit {
  public createRouteForm!: FormGroup;

  // For driver
  public driverNameCtrl = new FormControl('');
  public filteredDrivers: Observable<any[]> | any;
  public driversArray: any[] = [];

  // For vehicle
  public vehicleMakeCtrl = new FormControl('');
  public filteredVehicles: Observable<any[]> | any;
  public vehiclesArray: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddRouteComponent>,
    private _fb: FormBuilder,
    private routesService: RouteService,
    private driverService: DriversService,
    private vehiclesService: VehicleService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createRouteForm = this.createRouteFormulary();

    this.driverService
      .getAllDrivers()
      .subscribe(({ documents }) => (this.driversArray = documents));

    this.vehiclesService
      .getAllVehicles()
      .subscribe(({ documents }) => (this.vehiclesArray = documents));

    this.filteredDrivers = this.driverNameCtrl.valueChanges.pipe(
      startWith(''),
      // This is because when selected, the value comes as an object
      map((value) => (typeof value === 'string' ? value : value?.firstName)),
      // Then do the filtering
      map((name) =>
        name ? this._filterDrivers(name) : this.driversArray.slice()
      )
    );

    this.filteredVehicles = this.vehicleMakeCtrl.valueChanges.pipe(
      startWith(''),
      // This is because when selected, the value comes as an object
      map((value) => (typeof value === 'string' ? value : value?.make)),
      // Then do the filtering
      map((make) =>
        make ? this._filterVehicles(make) : this.vehiclesArray.slice()
      )
    );
  }

  private _filterDrivers(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.driversArray.filter((option) =>
      option.firstName.toLowerCase().includes(filterValue)
    );
  }

  private _filterVehicles(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.vehiclesArray.filter((option) => {
      return option.make.toLowerCase().includes(filterValue);
    });
  }

  fillDriver(driver: IDriver): void {
    this.createRouteForm.patchValue({ driverId: driver._id });
  }

  fillVehicle(vehicle: IVehicle): void {
    this.createRouteForm.patchValue({ vehicleId: vehicle._id });
  }

  displayDriverMat(driver: IDriver) {
    return driver && driver.firstName
      ? `${driver.firstName} ${driver.lastName}`
      : '';
  }

  displayVehicleMat(vehicle: IVehicle) {
    return vehicle && vehicle.make ? vehicle.make : '';
  }

  get formValues() {
    return this.createRouteForm.value as IRoutes;
  }

  createRouteFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
      driverId: ['', Validators.required],
      vehicleId: ['', Validators.required],
    });
  }

  createRoute(): void {
    this.routesService.createRoute(this.formValues).subscribe((response) => {
      if (response.status) {
        this._snackBar.open('Route created successfully');
        this.dialogRef.close(true);
      } else {
        this._snackBar.open('An error has ocurred, please try again');
      }
    });
  }
}
