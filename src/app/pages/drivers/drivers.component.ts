import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDriver } from 'src/app/core/interfaces/drivers/drivers.interface';
import { DriversService } from 'src/app/core/services/drivers/drivers.service';
import { AddDriverComponent } from './add-driver/add-driver.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  public columns = [
    {
      columnDef: 'firstName',
      header: 'Primer Nombre',
      cell: (driver: IDriver) => `${driver.firstName}`,
    },
    {
      columnDef: 'lastName',
      header: 'Segundo Nombre',
      cell: (driver: IDriver) => `${driver.lastName}`,
    },
    {
      columnDef: 'ssn',
      header: 'SSN',
      cell: (driver: IDriver) => `${driver.ssn}`,
    },
    {
      columnDef: 'dob',
      header: 'Fecha de Nacimiento',
      cell: (driver: IDriver) => `${driver.dob.split('T')[0]}`,
    },
    {
      columnDef: 'address',
      header: 'Dirección',
      cell: (driver: IDriver) => `${driver.address}`,
    },
    {
      columnDef: 'city',
      header: 'Ciudad',
      cell: (driver: IDriver) => `${driver.city}`,
    },
    {
      columnDef: 'phone',
      header: 'Teléfono',
      cell: (driver: IDriver) => `${driver.phone}`,
    },
    {
      columnDef: 'zip',
      header: 'Código Postal',
      cell: (driver: IDriver) => `${driver.zip}`,
    },
  ];

  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: IDriver[] = [];

  constructor(
    private driversService: DriversService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDrivers();
  }

  addNewDriver(): void {
    const addDriverRef = this.dialog.open(AddDriverComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addDriverRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDrivers();
      }
    });
  }

  getDrivers(): void {
    this.driversService
      .getAllDrivers()
      .subscribe(({ documents }) => (this.dataSource = documents!));
  }

  redirectToDriver(driver: IDriver): any {
    this.router.navigate(['/platform/drivers/edit', driver._id]);
  }
}
