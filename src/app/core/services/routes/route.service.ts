import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../common/common.service';
import {
  IRoutes,
  RoutesResponse,
} from '../../interfaces/routes/route.interface';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private routesURL: string = 'routes';

  constructor(private commonService: CommonService) {}

  getAllRoutes(): Observable<RoutesResponse> {
    return this.commonService.getAll(this.routesURL);
  }

  getRouteById(id: string): Observable<RoutesResponse> {
    return this.commonService.getById(this.routesURL, id);
  }

  createRoute(data: IRoutes): Observable<RoutesResponse> {
    return this.commonService.post(this.routesURL, data);
  }

  updateRoute(id: string, data: IRoutes): Observable<RoutesResponse> {
    return this.commonService.put(this.routesURL, id, data);
  }

  deleteRoute(id: string): Observable<RoutesResponse> {
    return this.commonService.deleteById(this.routesURL, id);
  }
}
