import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.setHeaders(request);
        return next.handle(request);
    }

    private setHeaders(request: HttpRequest<any>): HttpRequest<any> {
        if (request.url.includes('/jwt-auth/v1/token')) {
            request = request.clone({
                headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
            });
        }
        return request;
    }
}
