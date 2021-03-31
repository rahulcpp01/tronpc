import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TronPCProduct } from 'src/models/cartModel';
import { Product } from 'src/models/product/product';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

  public image: string = "";
  public regularprice: number= 0;
  public productAvailable: boolean = false;
  public product_name: string = "";
  public productcart: TronPCProduct={};
  public product!: Product;

  @Input() id : number= 0;
  @Input() type : string =  "";  
  @Input() cartcount : number= 0;

  @Output() addToCartEvent = new EventEmitter<TronPCProduct>();
  @Output() removeFromCartEvent = new EventEmitter<TronPCProduct>();
  constructor(private productService: WoocommerceService) { }

  ngOnInit(): void {
    let product= this.product? this.product:this.productService.getProductFromSession(this.id,this.type);
    if(product.basic.regular_price > 0){
      this.regularprice = product.basic.regular_price; 
    }
    if(product.basic.images.length > 0){
      this.image = product.basic.images[0].src;
    }else{
      this.image = "../../../assets/images/i3.jpeg";
    }
    this.product_name = product.basic.name;
    this.productAvailable = true;
  }
  
  addToCart(): void {
    this.productcart.id = this.id;
    this.productcart.type = this.type;
    this.addToCartEvent.emit(this.productcart);
  }
}
