import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map, catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login( username: string, password: string ): Observable<true | { error: string }> {
    const res = this.http.post<{ access_token: string } | { error: string}>(`${this.apiUrl}/login`, { username, password });

    return res.pipe(
      map(response => {
        if (response && "access_token" in response) {
          this.setToken(response.access_token);
          return true;
        } else if (response && "error" in response) {
          return { error: response.error };
        }
        return { error: 'Unknown error. Please try again later.' };
      }),
      catchError(error => of({ error: error?.error?.message || error?.message || 'Unknown error. Please try again later.' }))
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  setToken(token: string): void {
    this.cookies.set('access_token', token, {
      secure: true,
      sameSite: 'Strict'
    });
  }

  getToken(): string | null {
    return this.cookies.get('access_token');
  }

  logout(): Observable<any> {
    const obs = this.http.post<any>(`${this.apiUrl}/logout`, {});
    obs.subscribe(() => {
      this.cookies.delete('access_token', '/');
    });
    return obs;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null && this.getToken() !== '';
  }
}
