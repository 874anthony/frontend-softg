import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';

// Custom
import { RouteService } from 'src/app/core/services/routes/route.service';
import { DriversService } from 'src/app/core/services/drivers/drivers.service';
import { IDriver } from 'src/app/core/interfaces/drivers/drivers.interface';
import { VehicleService } from 'src/app/core/services/vehicles/vehicle.service';
import { IVehicle } from 'src/app/core/interfaces/vehicles/vehicles.interface';
import { IRoutes } from 'src/app/core/interfaces/routes/route.interface';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss'],
})
export class EditRouteComponent implements OnInit {
  public updateRouteForm!: FormGroup;
  public idRoute: string = '';
  public updateVehicleDriver: boolean = false;

  // For driver
  public driverNameCtrl = new FormControl('');
  public filteredDrivers: Observable<any[]> | any;
  public driversArray: any[] = [];

  // For vehicle
  public vehicleMakeCtrl = new FormControl('');
  public filteredVehicles: Observable<any[]> | any;
  public vehiclesArray: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private driverService: DriversService,
    private vehiclesService: VehicleService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idRoute = id));
  }

  ngOnInit(): void {
    this.updateRouteForm = this.createRouteFormulary();

    this.routeService.getRouteById(this.idRoute).subscribe(({ document }) => {
      // This to exclude the necessary properties from the response
      const excludeFields = ['_id', 'active', 'createdAt', '__v'];

      Object.keys(document).forEach((key) => {
        if (excludeFields.includes(key)) {
          return;
        }

        this.updateRouteForm.controls[key].setValue(document[key]);

        if (key === 'vehicleId' || key === 'driverId') {
          this.updateRouteForm.controls[key].setValue(document[key]._id);
        }
      });
    });

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
    this.updateRouteForm.patchValue({ driverId: driver._id });
  }

  fillVehicle(vehicle: IVehicle): void {
    this.updateRouteForm.patchValue({ vehicleId: vehicle._id });
  }

  displayDriverMat(driver: IDriver) {
    return driver && driver.firstName
      ? `${driver.firstName} ${driver.lastName}`
      : '';
  }

  displayVehicleMat(vehicle: IVehicle) {
    return vehicle && vehicle.make ? vehicle.make : '';
  }

  createRouteFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
      driverId: ['', Validators.required],
      vehicleId: ['', Validators.required],
    });
  }

  get formValues(): IRoutes {
    return this.updateRouteForm.value;
  }

  updateRoute(): void {
    this.routeService
      .updateRoute(this.idRoute, this.formValues)
      .subscribe((response) => {
        if (response.status) {
          this._snackBar.open('Route updated successfully');
          this.router.navigate(['/platform/routes']);
        }
      });
  }

  deleteRoute(): void {
    this.routeService.deleteRoute(this.idRoute).subscribe(() => {
      this._snackBar.open('Route deleted successfully');
      this.router.navigate(['/platform/routes']);
    });
  }

  onBack(): void {
    this.location.back();
  }
}
