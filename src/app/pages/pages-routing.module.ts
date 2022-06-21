import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';

const routes: Routes = [
  {
    path: 'platform',
    component: DashboardComponent,

    children: [
      // ================== Drivers starts here ==================
      {
        path: 'drivers',
        component: DriversComponent,
      },
      {
        path: 'drivers/edit/:id',
        component: EditDriverComponent,
      },
      // ================== Drivers Ends here ==================
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
