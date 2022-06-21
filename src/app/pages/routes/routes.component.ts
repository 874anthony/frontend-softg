import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IRoutes } from 'src/app/core/interfaces/routes/route.interface';
import { RouteService } from 'src/app/core/services/routes/route.service';
import { AddRouteComponent } from './add-route/add-route.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  public columns = [
    {
      columnDef: 'description',
      header: 'Descripcion',
      cell: (route: IRoutes) => `${route.description}`,
    },
    {
      columnDef: 'driverId',
      header: 'Conductor',
      cell: (route: IRoutes) => `${route.driverId}`,
    },
    {
      columnDef: 'vehicleId',
      header: 'Vehiculo',
      cell: (route: IRoutes) => `${route.vehicleId}`,
    },
    {
      columnDef: 'createdAt',
      header: 'Creado en',
      cell: (route: IRoutes) => `${route.createdAt?.split('T')[0]}`,
    },
  ];

  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: IRoutes[] = [];

  constructor(
    private routesService: RouteService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(): void {
    this.routesService
      .getAllRoutes()
      .subscribe(({ documents }) => (this.dataSource = documents!));
  }

  addNewRoute(): void {
    const addRouteRef = this.dialog.open(AddRouteComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addRouteRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoutes();
      }
    });
  }

  redirectToRoute(route: IRoutes): void {
    this.router.navigate(['/platform/routes/edit', route._id]);
  }
}
