import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';
  private secretKey = 'secret';

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(UsernameOrEmail: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;

    const isEmail = UsernameOrEmail.includes('@');

    const loginData = isEmail
    ? { email: UsernameOrEmail, password, secretKey: this.secretKey}
    : { username: UsernameOrEmail, password, secretKey: this.secretKey}


    return this.http.post(url, loginData)
      .pipe(
        tap(() => {
          this.isAuthenticated$.next(true);
        })
      );
  }

  resetPasswordRequest(email: string): Observable<any> {
    const url = `${this.apiUrl}/forgot-password`;
    return this.http.post(url, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/reset-password`;

    const resetPasswordData = { token, newPassword, secretKey: this.secretKey };

    return this.http.post(url, resetPasswordData);
  }
}

