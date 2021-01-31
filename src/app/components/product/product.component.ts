import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Processor } from 'src/models/custommodels/processor.model';
import { Product } from 'src/models/product/product';
import { ProductImage } from 'src/models/product/product.image';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public image: string = "";
  public regularprice: number= 0;
  public productAvailable: boolean = false;
  public product_name: string = "";

  @Input() id : number= 0;
  @Input() type : string =  "";
  @Input() product!: Product;
  constructor(private productService: WoocommerceService) { }
   
  ngOnInit() {
    // console.log("id"+ this.id);
    let product= this.product? this.product:this.productService.getProductFromSession(this.id,this.type);
    if(product.basic.regular_price > 0){
      this.regularprice = product.basic.regular_price; 
    }
    if(product.basic.images.length > 0){
      this.image = product.basic.images[0].src;
    }
    this.product_name = product.basic.name;
    this.productAvailable = true;
  }

}
