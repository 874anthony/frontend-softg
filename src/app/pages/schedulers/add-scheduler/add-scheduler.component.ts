import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';

// Services
import { RouteService } from 'src/app/core/services/routes/route.service';
import { SchedulerService } from 'src/app/core/services/schedulers/scheduler.service';

import { IRoutes } from 'src/app/core/interfaces/routes/route.interface';
import { IScheduler } from 'src/app/core/interfaces/schedulers/scheduler.interface';

@Component({
  selector: 'app-add-scheduler',
  templateUrl: './add-scheduler.component.html',
  styleUrls: ['./add-scheduler.component.scss'],
})
export class AddSchedulerComponent implements OnInit {
  public createSchedulerForm!: FormGroup;

  // For routes
  public routeCtrl = new FormControl('');
  public filteredRoutes: Observable<any[]> | any;
  public routesArray: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddSchedulerComponent>,
    private _fb: FormBuilder,
    private routesService: RouteService,
    private schedulerService: SchedulerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createSchedulerForm = this.createSchedulerFormulary();

    this.routesService
      .getAllRoutes()
      .subscribe(({ documents }) => (this.routesArray = documents));

    this.filteredRoutes = this.routeCtrl.valueChanges.pipe(
      startWith(''),
      // This is because when selected, the value comes as an object
      map((value) => (typeof value === 'string' ? value : value?.description)),
      // Then do the filtering
      map((description) =>
        description ? this._filterRoutes(description) : this.routesArray.slice()
      )
    );
  }

  private _filterRoutes(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.routesArray.filter((option) =>
      option.description.toLowerCase().includes(filterValue)
    );
  }

  fillRoutes(route: IRoutes): void {
    this.createSchedulerForm.patchValue({ routeId: route._id });
  }

  displayRouteMat(route: IRoutes) {
    return route && route.description
      ? `${route.description} - ${route.createdAt?.split('T')[0]}`
      : '';
  }

  createSchedulerFormulary(): FormGroup {
    return this._fb.group({
      routeId: ['', Validators.required],
      weekNum: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  get formValues() {
    return this.createSchedulerForm.value as IScheduler;
  }

  createScheduler(): void {
    this.schedulerService
      .createScheduler(this.formValues)
      .subscribe((response) => {
        if (response.status) {
          this._snackBar.open('Scheduler created successfully');
          this.dialogRef.close(true);
        } else {
          this._snackBar.open('An error has ocurred, please try again');
        }
      });
  }
}
