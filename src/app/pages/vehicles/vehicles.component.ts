import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IVehicle } from 'src/app/core/interfaces/vehicles/vehicles.interface';
import { VehicleService } from 'src/app/core/services/vehicles/vehicle.service';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  public columns = [
    {
      columnDef: 'description',
      header: 'Descripcion',
      cell: (vehicle: IVehicle) => `${vehicle.description}`,
    },
    {
      columnDef: 'year',
      header: 'Año',
      cell: (vehicle: IVehicle) => `${vehicle.year}`,
    },
    {
      columnDef: 'make',
      header: 'Marca',
      cell: (vehicle: IVehicle) => `${vehicle.make}`,
    },
    {
      columnDef: 'capacity',
      header: 'Capacidad',
      cell: (vehicle: IVehicle) => `${vehicle.capacity}`,
    },
  ];

  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: IVehicle[] = [];

  constructor(
    private vehiclesService: VehicleService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehiclesService
      .getAllVehicles()
      .subscribe(({ documents }) => (this.dataSource = documents!));
  }

  addNewVehicle(): void {
    const addVehicleRef = this.dialog.open(AddVehicleComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addVehicleRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getVehicles();
      }
    });
  }

  redirectToVehicle(vehicle: IVehicle): void {
    this.router.navigate(['/platform/vehicles/edit', vehicle._id]);
  }
}
