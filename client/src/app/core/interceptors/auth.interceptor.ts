import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { EMPTY, Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { HttpError } from 'src/types/http-error';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // auth endpoint requests do not need a token attaching to the head
    if (!request.url.includes('/auth')) {
      request = this.attachAccessToken(request) || request;
      return next.handle(request).pipe(catchError((err) => this.handleError(request, next, err)));
    }

    return next.handle(request);
  }

  attachAccessToken(request: HttpRequest<unknown>): HttpRequest<unknown> | void {
    const accessToken = localStorage.getItem('accessToken');
    // terminate session and return user back to the auth page if no token found in local storage
    if (!accessToken) this.authService.clearUser();
    else {
      return request.clone({
        setHeaders: {
          Authorisation: `Bearer ${accessToken}`,
        },
      });
    }
  }

  handleError(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    err: HttpError
  ): Observable<HttpEvent<any> | never> {
    const { error } = err;
    if (error.message === 'Access token expired or invalid') {
      return this.handleInvalidAccessToken(request, next);
    }

    return throwError(() => err);
  }

  handleInvalidAccessToken(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any> | never> {
    return this.getNewAccessToken().pipe(
      switchMap((accessToken) => {
        localStorage.setItem('accessToken', accessToken);
        const newRequest = this.attachAccessToken(request);
        if (newRequest) return next.handle(newRequest);
        return EMPTY;
      })
    );
  }

  getNewAccessToken(): Observable<string | never> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.authService.clearUser();
      return EMPTY;
    }

    return this.authService.getNewAccessToken(refreshToken).pipe(
      catchError(() => {
        this.authService.clearUser();
        return EMPTY;
      })
    );
  }
}
