import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from '../../common/common.service';
import {
  DriverResponse,
  IDriver,
} from '../../interfaces/drivers/drivers.interface';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private driversURL: string = 'drivers';

  constructor(private commonService: CommonService) {}

  getAllDrivers(): Observable<DriverResponse> {
    return this.commonService.getAll(this.driversURL);
  }

  getDriverById(id: string): Observable<DriverResponse> {
    return this.commonService.getById(this.driversURL, id);
  }

  createDriver(data: IDriver): Observable<DriverResponse> {
    return this.commonService.post(this.driversURL, data);
  }

  updateDriver(id: string, data: IDriver): Observable<DriverResponse> {
    return this.commonService.put(this.driversURL, id, data);
  }

  deleteDriver(id: string): Observable<DriverResponse> {
    return this.commonService.deleteById(this.driversURL, id);
  }
}
