export interface IDriver {
  _id?: string;
  firstName: string;
  lastName: string;
  ssn: number;
  dob: string;
  address: string;
  city: string;
  phone: number;
  zip: number;
  active?: boolean;
  createdAt?: Date;
}

export interface DriverResponse {
  status: string;
  documents?: IDriver[] | any;
  document?: IDriver | any;
  error?: any;
}
