import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { Tokens } from 'src/types/tokens';
import { Router } from '@angular/router';

interface LoginBody {
  teamName: string;
  username: string;
  password: string;
}

interface SignUpBody extends LoginBody {
  firstName: string;
  lastName: string;
  jobTitle: string;
  confirmPassword: string;
}

interface LoggedInUser {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  jobTitle: string;
  teamId: number;
  authLevel: number;
  pictureColour: string;
}

interface DecodedToken extends LoggedInUser {
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser: null | LoggedInUser = null;

  constructor(private http: HttpClient, private router: Router) {}

  loginOrSignUp(type: 'login' | 'sign up', body: LoginBody | SignUpBody): Observable<Tokens> {
    if (type === 'login') return this.http.post<Tokens>(`${environment.api}/auth/login`, body);
    return this.http.post<Tokens>(`${environment.api}/auth/sign-up`, body);
  }

  handleSuccessfulLogin(tokens: Tokens): void {
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('accessToken', tokens.accessToken);
    this.setLoggedInUser();
    this.router.navigateByUrl('/dashboard');
  }

  setLoggedInUser(): void {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      this.loggedInUser = null;
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken) as DecodedToken;
      const { iat, exp, ...userData } = decodedToken;
      this.loggedInUser = userData;
    } catch (err) {
      this.clearUser();
    }
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refreshToken') as string;
    this.http.post<string>(`${environment.api}/auth/logout`, { refreshToken }).subscribe();
    this.clearUser();
  }

  clearUser(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.loggedInUser = null;
    this.router.navigateByUrl('/auth');
  }
}
