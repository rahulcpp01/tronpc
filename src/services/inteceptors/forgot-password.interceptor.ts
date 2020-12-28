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
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class ForgotPasswordInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.setHeaders(request);
        return next.handle(request);
    }

    private setHeaders(request: HttpRequest<any>): HttpRequest<any> {
        if (request.url.includes('/bdpwr/v1')) {
            request = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
            });
        }
        return request;
    }
}
