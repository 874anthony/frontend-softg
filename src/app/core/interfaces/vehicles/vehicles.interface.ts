export interface IVehicle {
  _id?: string;
  description: string;
  year: number;
  make: string;
  capacity: number;
  active?: boolean;
  createdAt?: Date;
}

export interface VehicleResponse {
  status: string;
  documents?: IVehicle[] | any;
  document?: IVehicle | any;
  error?: any;
}
