import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';
import { EditVehicleComponent } from './vehicles/edit-vehicle/edit-vehicle.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  {
    path: 'platform',
    component: DashboardComponent,

    children: [
      {
        path: 'drivers',
        component: DriversComponent,
      },
      {
        path: 'drivers/edit/:id',
        component: EditDriverComponent,
      },

      {
        path: 'vehicles',
        component: VehiclesComponent,
      },
      {
        path: 'vehicles/edit/:id',
        component: EditVehicleComponent,
      },
      {
        path: '**',
        redirectTo: 'drivers',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
