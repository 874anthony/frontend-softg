import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';

// Child components
import { DriversComponent } from './drivers/drivers.component';
import { RoutesComponent } from './routes/routes.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SchedulersComponent } from './schedulers/schedulers.component';

import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';
import { EditRouteComponent } from './routes/edit-route/edit-route.component';
import { EditVehicleComponent } from './vehicles/edit-vehicle/edit-vehicle.component';
import { EditSchedulerComponent } from './schedulers/edit-scheduler/edit-scheduler.component';

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
        path: 'routes',
        component: RoutesComponent,
      },
      {
        path: 'routes/edit/:id',
        component: EditRouteComponent,
      },
      {
        path: 'schedulers',
        component: SchedulersComponent,
      },
      {
        path: 'schedulers/edit/:id',
        component: EditSchedulerComponent,
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
