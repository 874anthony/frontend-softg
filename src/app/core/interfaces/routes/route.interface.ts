export interface IRoutes {
  _id?: string;
  description: string;
  driverId: string;
  vehicleId: string;
  active?: boolean;
  createdAt?: string;
}

export interface RoutesResponse {
  status: string;
  documents?: IRoutes[] | any;
  document?: IRoutes | any;
  error?: any;
}
