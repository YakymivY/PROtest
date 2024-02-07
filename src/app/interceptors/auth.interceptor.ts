import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('/login') || request.url.includes('/register')) {
      return next.handle(request);
    }

    try {
      const localToken = sessionStorage.getItem('token');
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localToken) });
    } catch {
      console.log("ERROR. No token found");
    }
    
    return next.handle(request);
  }
}

export const AuthInterceptrProvider = {
  provide: HTTP_INTERCEPTORS, 
  useClass: AuthInterceptor, 
  multi: true
};