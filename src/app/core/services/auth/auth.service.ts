import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Services
import { CommonService } from '../../common/common.service';

// Interfaces
import { UserDTO } from '../../interfaces/auth/create-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private createUserURL = 'auth/create-user';
  private logInURL = 'auth/login';

  public userInfo: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private commonService: CommonService) {}

  createUser(data: UserDTO): Observable<any> {
    return this.commonService.post(this.createUserURL, data);
  }

  logIn(data: UserDTO): Observable<any> {
    return this.commonService.post(this.logInURL, data);
  }
}
