import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

  if (token) {
     // If we have a token, we set it to the header
    request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
    });
  }
  return next.handle(request);
  }
}
