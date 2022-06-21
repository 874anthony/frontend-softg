import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Custom
import { CommonService } from '../../common/common.service';
import {
  IVehicle,
  VehicleResponse,
} from '../../interfaces/vehicles/vehicles.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehiclesURL: string = 'vehicles';

  constructor(private commonService: CommonService) {}

  getAllVehicles(): Observable<VehicleResponse> {
    return this.commonService.getAll(this.vehiclesURL);
  }

  getVehicleById(id: string): Observable<VehicleResponse> {
    return this.commonService.getById(this.vehiclesURL, id);
  }

  createVehicle(data: IVehicle): Observable<VehicleResponse> {
    return this.commonService.post(this.vehiclesURL, data);
  }

  updateVehicle(id: string, data: IVehicle): Observable<VehicleResponse> {
    return this.commonService.put(this.vehiclesURL, id, data);
  }

  deleteVehicle(id: string): Observable<VehicleResponse> {
    return this.commonService.deleteById(this.vehiclesURL, id);
  }
}
