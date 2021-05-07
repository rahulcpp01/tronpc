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
    // if (userdetails && userdetails.id! > 0) {
    //   // Existing users
    //   this.httpClient.put(`/customers/${userdetails.id}`, { ...userdetails }).subscribe(async existingcustomer => {
    //     debugger;
    //     this.userService.setUserInfo(this.encryptDecryptService.encryptData(existingcustomer));
    //     //sessionStorage["skipRegistration"] = this.encryptDecryptService.encryptData("true");
    //     // this.router.navigateByUrl('/tabs/tab-account', { skipLocationChange: false }).then(() => {
    //     //   this.router.navigate(['/tabs/tab-account']);
    //     // });
    //     alert("User Created successfully");

    //   }, async err => {
    //     console.log("Error"+err);

    //   });
    // } else {
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
    //}
  }

  addToServerCart(){
    if(localStorage["user"]){
      let userdatafromlocal = this.userService.getUserInfo();
      if (userdatafromlocal) { //user available      
        const savedUser = this.encryptDecryptService.decryptData(userdatafromlocal);        
         this.httpClient.put(`/customers/${savedUser.id}`, { meta_data :[
           {
            key: "tronpccart",
            value: localStorage["cart"]
           }
         ] }).subscribe(resp =>{
           debugger;

         },err =>{
           debugger;
         })
      }else{
        alert("Please Login and try");
      }
    }
      
  }

  getCustomerById(id: number) {
    return this.httpClient.get<CustomerModel>(`/customers/${id}`);
  }

  giveProductReview(product_id: number,review: string, rating: number){
    debugger;
    if(localStorage["user"]){
      let userdatafromlocal = this.userService.getUserInfo();  
      if (userdatafromlocal) { //user available      
        const savedUser = this.encryptDecryptService.decryptData(userdatafromlocal);
        let reviewModel = {
          product_id : product_id,
          review : review,
          reviewer : savedUser.first_name,
          reviewer_email : savedUser.email,
          rating : rating
       }
       this.httpClient.post(`/products/reviews`,{...reviewModel}).subscribe(resp =>{
          debugger;
          console.log(resp);
          alert("Submitted review. wait for Approval");
       },err =>{
         debugger;
         console.log(err);
       })
      } 
      
    } else{
      alert("Only registered user can submit Review. If you are existing customer, please Login & Try again")
    }
    
  }
}