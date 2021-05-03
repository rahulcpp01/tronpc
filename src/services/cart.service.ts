import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CartModel, TronPCProduct } from 'src/models/cartModel';
import { Product } from 'src/models/product/product';
import { Order } from 'src/models/orders/orders';
import { CustomerService } from './customer.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // Local Variables
    // private serverUrl = environment.backend_api_url;
    private cartDataArray: CartModel = this.initializeCartModel();
    private associatedProductIds: number[] = [];
    private $associatedProductIds = new BehaviorSubject<number[]>([]);
    private cartData$ = new BehaviorSubject<CartModel>({ count: 0, productData: [] });
    private totalAmount = 0;
    private totalAmount$ = new BehaviorSubject<number>(0);
    private checkouterror$ = new BehaviorSubject<string>("");

    constructor(private httpClient: HttpClient,
        private router: Router,
        private customerService: CustomerService) {
        this.totalAmount = 0;
        // this.storage.get('cart').then(data => {
        //     if (data) {
        //         this.cartDataArray = data;
        //         this.cartData$.next(this.cartDataArray);
        //         this.calculateTotal();
        //     }
        // });
    }

    get cartData(): Observable<CartModel> {
        return this.cartData$.asObservable();
    }
    get cartTotal(): Observable<number> {
        return this.totalAmount$.asObservable();
    }
    get checkoutError(): Observable<string> {
        return this.checkouterror$.asObservable();
    }
    // get associatedProductList(): Observable<number[]> {
    //     return this.$associatedProductIds.asObservable();
    // }

    async addToCart(product: TronPCProduct) {
        // When the cart is not completely empty
        if (this.cartDataArray && this.cartDataArray.count !== 0) {
            // Calculate Index
            const index = this.cartDataArray.productData.findIndex(p => p.id === product.id);
            // If there is a match, that means the index is not equal to -1
            if (index > -1) {
                this.cartDataArray.productData[index].in_cart=(this.cartDataArray.productData[index].in_cart ||0)+1;
                this.calculateTotal();
                //this.storage.set('cart', this.cartDataArray).then();
                localStorage["cart"] = JSON.stringify(this.cartDataArray);
                this.customerService.addToServerCart();
                //await toast.present().then();
                this.cartData$.next(this.cartDataArray);
            }
            // When the product is not in cart array but the cart is not empty
            else {
                this.cartDataArray.productData.push(product);
                const newProductIndex = this.cartDataArray.productData.findIndex(p => p.id === product.id);
                this.cartDataArray.productData[newProductIndex].in_cart = 1;
                this.calculateTotal();
                //await toast.present().then();
                this.cartDataArray.count = this.cartDataArray.productData.length;
                //this.storage.set('cart', this.cartDataArray).then();
                localStorage["cart"] = JSON.stringify(this.cartDataArray);
                this.customerService.addToServerCart();
                this.cartData$.next(this.cartDataArray);
            }
        }
        // When the cart is absolutely empty
        else {
            //await toast.present().then();
            this.cartDataArray = this.initializeCartModel();
            this.cartDataArray.productData.push({ ...product, in_cart: 1 });
            this.cartDataArray.count = this.cartDataArray.productData.length;
            this.calculateTotal();
            //this.storage.set('cart', this.cartDataArray).then();
            localStorage["cart"] = JSON.stringify(this.cartDataArray);
            this.customerService.addToServerCart();
            // await alert.present().then();
            this.cartData$.next(this.cartDataArray);
            // Related and Upselling Product
        }
    }

     removeFromCart(product: TronPCProduct) {
        this.cartDataArray.productData = this.cartDataArray.productData.filter(p => p.id !== product.id);
        this.cartDataArray.count = this.cartDataArray.productData.length;
        this.calculateTotal();

        this.cartData$.next(this.cartDataArray);
        this.totalAmount$.next(this.totalAmount);
        //this.storage.set('cart', this.cartDataArray).then();
        localStorage["cart"] = JSON.stringify(this.cartDataArray);
        this.customerService.addToServerCart();
        let updatedIds: number[] = []; 
        this.associatedProductIds = updatedIds;
        this.$associatedProductIds.next(updatedIds);
        return this.cartDataArray.productData;
    }

    private calculateTotal() {
        this.totalAmount = 0;
        if (!this.cartDataArray || !this.cartDataArray.productData || this.cartDataArray.productData.length === 0) {
            this.totalAmount = 0;
            this.totalAmount$.next(this.totalAmount);
            return;
        }

        // this.cartDataArray.productData.forEach(p => {
        //     this.totalAmount += parseInt(p.price, 10) * p.in_cart;
        // });
        this.totalAmount$.next(this.totalAmount);
    }

    updateQuantity(indexOfProduct: number, newInCartValue: number) {        
        const index = this.cartDataArray.productData.findIndex(p => p.id === indexOfProduct);
        this.cartDataArray.productData[index].in_cart = newInCartValue;
        this.calculateTotal();
        //this.storage.set('cart', this.cartDataArray).then();
        localStorage["cart"] = JSON.stringify(this.cartDataArray);
        this.customerService.addToServerCart();
        this.cartData$.next(this.cartDataArray);
        this.totalAmount$.next(this.totalAmount);
    }

    private emptyCart() {
        this.cartDataArray = {
            count: 0,
            productData: []
        };
        //this.storage.set('cart', this.cartDataArray).then();
        localStorage["cart"] = JSON.stringify(this.cartDataArray);
        this.customerService.addToServerCart();
        this.calculateTotal();
        this.cartData$.next(this.cartDataArray);
    }

    private initializeCartModel(): CartModel {
        return <CartModel>{
            count: 0,
            productData: []
        }
    }

    clearCart() {
        //return this.storage.remove('cart');
        localStorage.removeItem("cart");
    }

    getAllPaymentGateways() {
        return this.httpClient.get(`/payment_gateways`);
    }
    getTaxes() {
        return this.httpClient.get(`/taxes`);
    }

    async createOrder(orderData: Order) {

        this.httpClient.post(`/orders`, { ...orderData })
            .subscribe(async (newOrderDetails: any) => {
                this.emptyCart();
                
            }, async error => {
                console.log(error);              
                this.checkouterror$.next(error.error.message);
            });
    }
}
