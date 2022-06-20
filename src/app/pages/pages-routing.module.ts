import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';

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
