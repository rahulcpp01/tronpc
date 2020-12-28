import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Customer } from 'src/models/user/customer';
import { EncryptDecryptService } from './encrypt-decrypt.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: Storage) { }

  getUserInfo() {
    return this.storage.get('user');
  }

  setUserInfo(user: Customer | string) {
    this.storage.set('user', user).then();
  }

  clearUser() {
    this.storage.remove('user');
  }

}
