import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom modules
import { MaterialModule } from '../material/material.module';

// Routes modules
import { PagesRoutingModule } from './pages-routing.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';

@NgModule({
  declarations: [DashboardComponent, DriversComponent],
  imports: [CommonModule, PagesRoutingModule, MaterialModule],
})
export class PagesModule {}
