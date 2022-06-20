import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from '../../common/common.service';
import { DriverResponse } from '../../interfaces/drivers/drivers.interface';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private driversURL: string = 'drivers';

  constructor(private commonService: CommonService) {}

  getAllDrivers(): Observable<DriverResponse> {
    return this.commonService.getAll(this.driversURL);
  }
}
