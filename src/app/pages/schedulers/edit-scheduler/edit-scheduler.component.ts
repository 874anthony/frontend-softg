import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { IRoutes } from 'src/app/core/interfaces/routes/route.interface';
import { IScheduler } from 'src/app/core/interfaces/schedulers/scheduler.interface';

// Services
import { RouteService } from 'src/app/core/services/routes/route.service';
import { SchedulerService } from 'src/app/core/services/schedulers/scheduler.service';

@Component({
  selector: 'app-edit-scheduler',
  templateUrl: './edit-scheduler.component.html',
  styleUrls: ['./edit-scheduler.component.scss'],
})
export class EditSchedulerComponent implements OnInit {
  public updateSchedulerForm!: FormGroup;
  public idScheduler: string = '';
  public updateRoute: boolean = false;

  // For routes
  public routeCtrl = new FormControl('');
  public filteredRoutes: Observable<any[]> | any;
  public routesArray: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private routesService: RouteService,
    private schedulerService: SchedulerService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idScheduler = id));
  }

  ngOnInit(): void {
    this.updateSchedulerForm = this.createSchedulerFormulary();

    this.schedulerService
      .getSchedulerById(this.idScheduler)
      .subscribe(({ document }) => {
        // This to exclude the necessary properties from the response
        const excludeFields = ['_id', 'active', 'createdAt', '__v'];

        Object.keys(document).forEach((key) => {
          if (excludeFields.includes(key)) {
            return;
          }

          this.updateSchedulerForm.controls[key].setValue(document[key]);

          if (key === 'routeId') {
            this.updateSchedulerForm.controls[key].setValue(document[key]._id);
          }
        });
      });

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
    this.updateSchedulerForm.patchValue({ routeId: route._id });
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

  get formValues(): IScheduler {
    return this.updateSchedulerForm.value;
  }

  updateScheduler(): void {
    this.schedulerService
      .updateScheduler(this.idScheduler, this.formValues)
      .subscribe((response) => {
        if (response.status) {
          this._snackBar.open('Scheduler updated successfully');
          this.router.navigate(['/platform/schedulers']);
        }
      });
  }

  deleteScheduler(): void {
    this.schedulerService.deleteScheduler(this.idScheduler).subscribe(() => {
      this._snackBar.open('Scheduler deleted successfully');
      this.router.navigate(['/platform/schedulers']);
    });
  }

  onBack(): void {
    this.location.back();
  }
}
