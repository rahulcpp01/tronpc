import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment.prod';
import { CartModel } from 'src/models/cartModel';
import { OrderLine } from 'src/models/orders/order.line';
import { Order } from 'src/models/orders/orders';
import { Customer } from 'src/models/user/customer';
import { CartService } from 'src/services/cart.service';
import { EncryptDecryptService } from 'src/services/encrypt-decrypt.service';
import { UserService } from 'src/services/user.service';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public cart!: CartModel;
  public total: number=0;
  indianStates = environment.states;
  public userdetails: Customer = {
    first_name: "",
    last_name: "",
    email: "",
    billing: {
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      phone: ""
    },
    shipping: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    }
  };
  constructor(private productService: WoocommerceService,
    private cartService: CartService,
    private userService: UserService,
    private encryptDecryptService:EncryptDecryptService,) { }

  ngOnInit(): void {
    if(localStorage["user"]){
      let userData = this.userService.getUserInfo();     
      if (userData) {
          this.userdetails = this.encryptDecryptService.decryptData(userData);     

      } else {
          
      }
    }

    // this.cartService.cartData.pipe(map(data => {
    //   let totalproductcount = 0;
    //   if (data) {
    //     data.productData.forEach(products => {
    //       totalproductcount += products.in_cart ? products.in_cart: 0;
    //     });
    //   }
    //   console.log("Total Product"+ totalproductcount);
    //   return totalproductcount;
    // })
    // ).subscribe(count => {
    //   console.log("Subscribe Count"+ count);
    //   this.cartcount = count;
    // });
    this.cartService.cartData.subscribe(data => {
      this.cart = data;
    });
    this.cartService.cartTotal.subscribe(total => this.total = total);
  }


  async placeOrder() {

    debugger;
    const lineItems: OrderLine[] = [];

    this.cart.productData.forEach(product => {
      lineItems.push({
        name: product.type||"",
        product_id: product.id || 0,
        quantity: product.in_cart||0
      });      
    });

    
   

    //order
    let formData: Order = {};
    
    formData = {
      set_paid: false,      
      billing: {
          address_1: this.userdetails.billing?.address_1||"",
          address_2: this.userdetails.billing?.address_2||"",
          city: this.userdetails.billing?.city||"",
          state: this.userdetails.billing?.state||"",
          country: 'IN',
          postcode: this.userdetails.billing?.postcode||"",
          first_name: this.userdetails?.first_name||"",
          last_name: this.userdetails?.last_name||"",
          email: this.userdetails?.email||"",
          phone: this.userdetails?.billing?.phone||""
      },
      shipping: {
          address_1: this.userdetails?.shipping?.address_1||"",
          address_2: this.userdetails?.shipping?.address_2||"",
          city: this.userdetails?.shipping?.city||"",
          state: this.userdetails?.shipping?.state||"",
          country: 'IN',
          postcode: this.userdetails?.shipping?.postcode||"",
          first_name: this.userdetails?.first_name||"",
          last_name: this.userdetails?.last_name||""
      },
      //line_items: 
      line_items: lineItems,

  };

  if(localStorage["user"]){
  let userdatafromlocal =   this.userService.getUserInfo();
      debugger;
      if (userdatafromlocal) { //user available      
          const savedUser = this.encryptDecryptService.decryptData(userdatafromlocal);
          formData.customer_id = savedUser.id;
          this.cartService.createOrder(formData).then(() => {
            alert("Order Placed Successfully");
        });
      } else {  // user not available 
          formData.customer_id = 0;
          this.cartService.createOrder(formData).then(() => {
            alert("Order Placed Successfully");
        });
      }

  }else{
    alert("Please Login/ Register the user ");
  }    
  
  }

}
