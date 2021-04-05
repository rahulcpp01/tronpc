import { Injectable } from '@angular/core';
import { Customer } from 'src/models/user/customer';
import { EncryptDecryptService } from './encrypt-decrypt.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserInfo() {
   // return this.storage.get('user');
   return JSON.parse(localStorage["user"]);
  }

  setUserInfo(user: Customer | string) {
    localStorage["user"]= JSON.stringify(user);
  }

  clearUser() {
    localStorage.removeItem('user;')
  }

}
