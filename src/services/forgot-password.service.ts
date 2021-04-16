import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ForgotPassword } from '../models/forgot-password/forgot-password';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {

    constructor(private httpClient: HttpClient) {

    }

    public resetPassword(forgotPassword: ForgotPassword): Observable<any> {
        return this.httpClient.post(environment.forgotPasswordUrl + `/reset-password`, { email: forgotPassword.email });
    }

    public validateCode(forgotPassword: ForgotPassword): Observable<any> {
        return this.httpClient.post(environment.forgotPasswordUrl + `/validate-code`,
            { email: forgotPassword.email, code: forgotPassword.code });
    }

    public setNewPassword(forgotPassword: ForgotPassword): Observable<any> {
        return this.httpClient.post(environment.forgotPasswordUrl + `/set-password`,
            { email: forgotPassword.email, code: forgotPassword.code, password: forgotPassword.password, });
    }
}
