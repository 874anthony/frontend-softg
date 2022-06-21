import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../common/common.service';
import {
  IScheduler,
  SchedulerResponse,
} from '../../interfaces/schedulers/scheduler.interface';

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  private schedulersURL: string = 'schedulers';

  constructor(private commonService: CommonService) {}

  getAllSchedulers(): Observable<SchedulerResponse> {
    return this.commonService.getAll(this.schedulersURL);
  }

  getSchedulerById(id: string): Observable<SchedulerResponse> {
    return this.commonService.getById(this.schedulersURL, id);
  }

  createScheduler(data: IScheduler): Observable<SchedulerResponse> {
    return this.commonService.post(this.schedulersURL, data);
  }

  updateScheduler(id: string, data: IScheduler): Observable<SchedulerResponse> {
    return this.commonService.put(this.schedulersURL, id, data);
  }

  deleteScheduler(id: string): Observable<SchedulerResponse> {
    return this.commonService.deleteById(this.schedulersURL, id);
  }
}
