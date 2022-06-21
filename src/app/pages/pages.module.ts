import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Custom modules
import { MaterialModule } from '../material/material.module';

// Routes modules
import { PagesRoutingModule } from './pages-routing.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddVehicleComponent } from './vehicles/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './vehicles/edit-vehicle/edit-vehicle.component';
import { RoutesComponent } from './routes/routes.component';
import { AddRouteComponent } from './routes/add-route/add-route.component';
import { EditRouteComponent } from './routes/edit-route/edit-route.component';
import { SchedulersComponent } from './schedulers/schedulers.component';
import { AddSchedulerComponent } from './schedulers/add-scheduler/add-scheduler.component';
import { EditSchedulerComponent } from './schedulers/edit-scheduler/edit-scheduler.component';

@NgModule({
  declarations: [DashboardComponent, DriversComponent, AddDriverComponent, EditDriverComponent, VehiclesComponent, AddVehicleComponent, EditVehicleComponent, RoutesComponent, AddRouteComponent, EditRouteComponent, SchedulersComponent, AddSchedulerComponent, EditSchedulerComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
