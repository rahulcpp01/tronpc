import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TronPCProduct } from 'src/models/cartModel';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input('prod') productsInCart: TronPCProduct[] = [];
  @Output() addToCartEvent = new EventEmitter<TronPCProduct>();
  constructor(private cartService: CartService) { }

  ngOnInit() {    
  }
  updateQuantity(p: TronPCProduct, updatedquantity: any, index: number) {
    if (updatedquantity > 0) {
      this.cartService.updateQuantity(index, updatedquantity);
    }
  }

  removeItemFromCart(prod: TronPCProduct) {
    this.productsInCart = this.cartService.removeFromCart(prod);
  }

  addToCart(prod: TronPCProduct) {
    this.addToCartEvent.emit(prod);
  }
}
