import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Pages of the app
  public pages: Array<{ title: string; link: string }> = [
    { title: 'Drivers', link: '/platform/drivers' },
    { title: 'Vehicles', link: '/platform/vehicles' },
    { title: 'Routes', link: '/platform/routes' },
    { title: 'Scheduler', link: '/platform/schedulers' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
