import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  attemptLogin(username: string, password: string): Observable<string> {
    return this.http.post<string>('http://localhost:3000/api/auth/login', { username, password })
        .pipe(
          map((res: any) => res.token)
        );
  }
}
