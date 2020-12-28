import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EncryptDecryptService {

    encryptData(data: any) {
        return data ? CryptoJS.AES.encrypt(JSON.stringify(data), environment.secretCode).toString() : '';
    }

    decryptData(data: any) {
        if (data) {
            const bytes = CryptoJS.AES.decrypt(data, environment.secretCode);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
        }
    }
}
