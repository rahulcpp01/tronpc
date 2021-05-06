import { DOCUMENT, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit,Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/models/user/customer';
import { CartService } from 'src/services/cart.service';
import { CustomerService } from 'src/services/customer.service';
import { EncryptDecryptService } from 'src/services/encrypt-decrypt.service';
import { UserService } from 'src/services/user.service';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  public userdetails: Customer= {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
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
  darkmode: boolean= false;
  public registerpopup: boolean = false;
  public loginpopup: boolean = false;
  public indianStates = environment.states;
  public checkouterror!: string;
  
  public isEditMode: boolean = false;

  public searchresult: string[]=[];
  public searchresulturl : string[] = [];

  public loggeduser: boolean = false;
  public loggedinname: string = "";
  public loggedavather: string = "";
  public showsearch: boolean = false;
  
  public fieldTextType: boolean = false;
  // Regex
  private email_regex: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.[a-zA-Z]+([-.][a-zA-Z]+)*$/;
  private phone_regex: RegExp = /^\d{10}$/;
  private zipCode_regex: RegExp = /^\d{5,6}$/;


  public username: string = "";
  public password: string = "";
  private tokenurl = environment.token_verify_url;

  constructor(@Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2,
  private productService: WoocommerceService,
  private _location: Location,
  private customerservice: CustomerService,
  private http: HttpClient,
  private userService: UserService,
  private cartService: CartService,
  private encryptDecryptService: EncryptDecryptService) { 

  }

  ngOnInit(): void {
   
    if(localStorage["user"]){
      let userData = this.userService.getUserInfo();     
      if (userData) {
          //this.userdetails = this.encryptDecryptService.decryptData(userData);
          //this.loggeduser= true;
          //this.loggedavather = userData.avatar_url|| "";
          //this.loggedinname = userData.first_name || "";

          //Load Cart data
          this.customerservice.getCustomerById(userData.id).subscribe((resp: any) =>{
            debugger;
            this.userService.setUserInfo(this.encryptDecryptService.encryptData(resp));     
            this.loggeduser= true;
            this.loggedavather = userData.avatar_url|| "";
            this.loggedinname = userData.first_name || "";

            // localStorage.setItem("cart",resp.meta_data.find((x: any)=>x.key==="tronpccart").value);
            
            let tronpccart =  resp.meta_data.find((x: any)=>x.key==="tronpccart").value;

            this.cartService.loadCartFromServer(tronpccart);
          }, err =>{
            debugger;
          })
          
      } else {

      }
    }
  }

  toggleDarkmode(){
    this.darkmode = !this.darkmode;
    if(this.darkmode){
      this.renderer.addClass(this.document.body, 'dark-mode');
    }else{
      this.renderer.removeClass(this.document.body, 'dark-mode');
    }
    
  }

  goback(){
    this._location.back()
  }

  search(val: string){
    if(val.length<2){
      this.searchresult = [];      
      this.searchresulturl = [];
    }else{
      this.productService.searchProducts(val).subscribe(x=>{
        this.searchresult = [];
        this.searchresulturl = [];
       // console.clear();
        //console.log("ALL: "+x);
        //console.log(x.filter(y=>{return (y.name||"").toUpperCase().indexOf(val.toUpperCase()) != -1}));
        let filteredresult = x.filter(y=>{return (y.name||"").toUpperCase().indexOf(val.toUpperCase()) != -1})
        filteredresult.forEach(x=>{
          this.searchresult.push(x.name||"");
          this.searchresulturl.push("/description/"+this.productService.findCategory(x.categories?.[0].name||"")+"/"+x.id);
          console.log(this.searchresulturl);
        })
      })
    }    
  }

  async saveUserInfo(userinfo: NgForm) {
    debugger;
    if (this.isValidUserData()) {
      this.checkouterror = '';
      this.formCustomerData();
      this.customerservice.registerCustomer(this.userdetails).then();
    } else {
      console.log("Error");
    }
  }

  formCustomerData() {
    //create username
    this.userdetails.username = this.userdetails.billing!.phone;
    //create billing address
    this.userdetails.billing!.first_name = this.userdetails.first_name;
    this.userdetails.billing!.last_name = this.userdetails.last_name;
    this.userdetails.billing!.company = "";
    this.userdetails.billing!.country = "IN";
    this.userdetails.billing!.email = this.userdetails.email;

    //creating shipping address
    this.userdetails.shipping!.first_name = this.userdetails.billing!.first_name;
    this.userdetails.shipping!.last_name = this.userdetails.billing!.last_name;
    this.userdetails.shipping!.company = "";
    this.userdetails.shipping!.country = "IN";
    this.userdetails.shipping!.address_1 = this.userdetails.billing!.address_1;
    this.userdetails.shipping!.address_2 = this.userdetails.billing!.address_2;
    this.userdetails.shipping!.city = this.userdetails.billing!.city;
    this.userdetails.shipping!.state = this.userdetails.billing!.state;
    this.userdetails.shipping!.postcode = this.userdetails.billing!.postcode;
  }

  isValidUserData(): boolean {
    if (!!this.userdetails.email) {
      if (!this.userdetails.email.match(this.email_regex)) {
        return false;
      }
    }
    if (!!this.userdetails.billing && !!this.userdetails.billing.phone) {
      if (!this.userdetails.billing.phone.match(this.phone_regex)) {
        return false;
      }
    }
    if (!!this.userdetails.billing && !!this.userdetails.billing.postcode) {
      if (!this.userdetails.billing.postcode.match(this.zipCode_regex)) {
        return false;
      }
    }
    return true;
  }

  async loginUser() {

    //const userData = `username=8762801994&password=e1$VwhW(CRD0`; 
    let userData = `username=${this.username}&password=${this.password}`;
    return new Promise((resolve, reject) => {
      this.http.post(environment.auth_url, {username:this.username,password:this.password}).subscribe((res: any) => {
        debugger;
        if(res.token){          
            //For retreiving customer  
            let responcedata: any =JSON.parse(atob(res.token.split('.')[1]));
            this.customerservice.getCustomerById(responcedata.data.user.id).subscribe((customer : any)=> {     
              debugger;       
              alert("Hi" + customer.first_name);
              this.userService.setUserInfo(this.encryptDecryptService.encryptData(customer));     
              this.loggeduser= true;
              let tronpccart =  customer.meta_data.find((x: any)=>x.key==="tronpccart").value;

              this.cartService.loadCartFromServer(tronpccart);
            }, customer_retreiving_error => {
              debugger;
              console.log(customer_retreiving_error);
            })
          
        }else{
          alert('Login failed :'+ res.code);
        }
        

        //for retreiving customer
      },
        err => {
          debugger;
          resolve(err);
          console.log(err);          
        }
      );
    });
  }

  logOut(){
    localStorage.removeItem("user");
    this.loggeduser= false;
  }
  
}
