import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CustomerModel } from 'src/models/customerModel';
import { Customer } from 'src/models/user/customer';
import { UserService } from './user.service';
import { EncryptDecryptService } from './encrypt-decrypt.service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // private serverUrl = environment.backend_api_url;
  constructor(private httpClient: HttpClient,
    private router: Router,
    private userService: UserService,
    private encryptDecryptService: EncryptDecryptService) { }

  async registerCustomer(userdetails: Customer) {
    debugger;
    if (userdetails && userdetails.id! > 0) {
      // Existing users
      this.httpClient.put(`/customers/${userdetails.id}`, { ...userdetails }).subscribe(async existingcustomer => {
        debugger;
        this.userService.setUserInfo(this.encryptDecryptService.encryptData(existingcustomer));
        //sessionStorage["skipRegistration"] = this.encryptDecryptService.encryptData("true");
        // this.router.navigateByUrl('/tabs/tab-account', { skipLocationChange: false }).then(() => {
        //   this.router.navigate(['/tabs/tab-account']);
        // });
        alert("User Created successfully");

      }, async err => {
        console.log("Error"+err);

      });
    } else {
      // New users
      this.httpClient.post(`/customers`, { ...userdetails }).subscribe(async newcustomer => {
        debugger;
        console.log('customer created'+ newcustomer);
       
        this.userService.setUserInfo(this.encryptDecryptService.encryptData(newcustomer));
        //sessionStorage["skipRegistration"] = this.encryptDecryptService.encryptData("true");
        // this.router.navigateByUrl('/tabs/tab-home', { skipLocationChange: false }).then(() => {
        //   this.router.navigate(['/tabs/tab-home']);
        // });

      }, async err => {
        
        console.log(err);
        
      });
    }
  }

  getCustomerById(id: number) {
    return this.httpClient.get<CustomerModel>(`/customers/${id}`);
  }
}