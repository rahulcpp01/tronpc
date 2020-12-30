import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setHeaders(request);
    return next.handle(request);
  }

  private setHeaders(request: HttpRequest<any>): HttpRequest<any> {
    if (request.url.search('/jwt-auth/v1/token') === -1 && request.url.search('/bdpwr/v1') === -1) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
      request = request.clone({
        setParams: {
          consumer_key: environment.readOnlyKeys.consumer_key,
          consumer_secret: environment.readOnlyKeys.consumer_secret
        }
      });
      request = request.clone({
        url: environment.backend_api_url + request.url,
        withCredentials: true
      });
    }
    return request;
  }

}