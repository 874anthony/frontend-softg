import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getAll(url: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/${url}`);
  }

  getById(url: string, id: string | number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/${url}/${id}`);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/${url}`, data);
  }

  put(url: string, id: string | number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/${url}/${id}`, data);
  }

  deleteById(url: string, id: string | number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/${url}/${id}`);
  }
}
