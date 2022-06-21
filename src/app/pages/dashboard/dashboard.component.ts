import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public username: string = '';

  // Pages of the app
  public pages: Array<{ title: string; link: string }> = [
    { title: 'Drivers', link: '/platform/drivers' },
    { title: 'Vehicles', link: '/platform/vehicles' },
    { title: 'Routes', link: '/platform/routes' },
    { title: 'Scheduler', link: '/platform/schedulers' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.userInfo.getValue();
  }

  logout(): void {
    this.authService.userInfo.next({});
    this.router.navigate(['/login']);
  }
}
