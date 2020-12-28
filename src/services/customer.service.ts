import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CustomerModel } from 'src/models/customerModel';
import { Customer } from 'src/models/user/customer';
import { UserService } from './user.service';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { AppConstants } from 'src/app/app.constants';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // private serverUrl = environment.backend_api_url;
  constructor(private httpClient: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private userService: UserService,
    private loadingController: LoadingController,
    private encryptDecryptService: EncryptDecryptService) { }

  async registerCustomer(userdetails: Customer) {
    const loader = await this.loadingController.create({
      message: (userdetails && userdetails.id > 0) ? AppConstants.update : AppConstants.register,
      animated: true,
      spinner: "bubbles",
      backdropDismiss: false,
      showBackdrop: true
    });
    await loader.present().then();
    const toast = await this.toastController.create({
      animated: true,
      buttons: [{ text: 'Done', role: 'cancel', icon: 'close' }]
    });

    if (userdetails && userdetails.id > 0) {
      // Existing users
      this.httpClient.put(`/customers/${userdetails.id}`, { ...userdetails }).subscribe(async existingcustomer => {
        await loader.dismiss().then();
        console.log('customer updated');
        toast.message = AppConstants.userUpdateSuccessMessage;
        toast.duration = 3000;
        await toast.present().then();

        this.userService.setUserInfo(this.encryptDecryptService.encryptData(existingcustomer));
        //sessionStorage["skipRegistration"] = this.encryptDecryptService.encryptData("true");
        this.router.navigateByUrl('/tabs/tab-account', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/tabs/tab-account']);
        });

      }, async err => {
        await loader.dismiss().then();
        console.log(err);
        toast.message = err.error.message ? err.error.message.split('.')[0] : AppConstants.commonError;
        toast.buttons = [{ text: 'Close', }]
        toast.duration = 5000;
        await toast.present().then();

      });
    } else {
      // New users
      this.httpClient.post(`/customers`, { ...userdetails }).subscribe(async newcustomer => {
        await loader.dismiss().then();
        console.log('customer created');
        toast.message = AppConstants.userRegisterSuccessMessage;
        toast.duration = 3000;
        await toast.present().then();
        console.log(newcustomer);

        this.userService.setUserInfo(this.encryptDecryptService.encryptData(newcustomer));
        //sessionStorage["skipRegistration"] = this.encryptDecryptService.encryptData("true");
        this.router.navigateByUrl('/tabs/tab-home', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/tabs/tab-home']);
        });

      }, async err => {
        await loader.dismiss().then();
        console.log(err);
        toast.message = err.error.message ? err.error.message.split('.')[0] : AppConstants.commonError;
        toast.buttons = [{ text: 'Close', }]
        toast.duration = 5000;
        await toast.present().then();

      });
    }
  }

  getCustomerById(id: number) {
    return this.httpClient.get<CustomerModel>(`/customers/${id}`);
  }
}