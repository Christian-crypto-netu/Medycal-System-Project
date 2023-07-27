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

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { username, password, secretKey: this.secretKey })
      .pipe(
        tap(() => {
          this.isAuthenticated$.next(true);
        })
      );
  }
}

