export interface IScheduler {
  _id?: string;
  routeId: string;
  weekNum: number;
  from: string;
  to: string;
  active?: boolean;
  createdAt?: string;
}

export interface SchedulerResponse {
  status: string;
  documents?: IScheduler[] | any;
  document?: IScheduler | any;
  error?: any;
}
