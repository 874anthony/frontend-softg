import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IScheduler } from 'src/app/core/interfaces/schedulers/scheduler.interface';

// Services
import { SchedulerService } from 'src/app/core/services/schedulers/scheduler.service';
import { AddSchedulerComponent } from './add-scheduler/add-scheduler.component';

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.scss'],
})
export class SchedulersComponent implements OnInit {
  public columns = [
    {
      columnDef: 'routeId',
      header: 'Ruta',
      cell: (scheduler: IScheduler) => `${scheduler.routeId}`,
    },
    {
      columnDef: 'weekNum',
      header: 'Semana',
      cell: (scheduler: IScheduler) => `${scheduler.weekNum}`,
    },
    {
      columnDef: 'from',
      header: 'Desde',
      cell: (scheduler: IScheduler) => `${scheduler.from}`,
    },
    {
      columnDef: 'to',
      header: 'Hasta',
      cell: (scheduler: IScheduler) => `${scheduler.to}`,
    },
    {
      columnDef: 'createdAt',
      header: 'Creado en',
      cell: (scheduler: IScheduler) => `${scheduler.createdAt?.split('T')[0]}`,
    },
  ];

  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: IScheduler[] = [];

  constructor(
    private schedulerService: SchedulerService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSchedulers();
  }

  getSchedulers(): void {
    this.schedulerService
      .getAllSchedulers()
      .subscribe(({ documents }) => (this.dataSource = documents!));
  }

  addNewScheduler(): void {
    const addSchedulerRef = this.dialog.open(AddSchedulerComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addSchedulerRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSchedulers();
      }
    });
  }

  redirectToScheduler(scheduler: IScheduler): void {
    this.router.navigate(['/platform/schedulers/edit', scheduler._id]);
  }
}
