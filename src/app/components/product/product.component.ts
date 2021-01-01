import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Processor } from 'src/models/custommodels/processor.model';
import { Product } from 'src/models/product/product';
import { ProductImage } from 'src/models/product/product.image';
import { WoocommerceService } from 'src/services/woocommerce.service';
import { ProcessorComponent } from '../processor/processor.component';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public image: string="";
  public regularprice: number= 0;
  public productAvailable: boolean = false;

  @Input() id : number= 0;
  @Input() type : string =  "";
  constructor(private productService: WoocommerceService) { }
   
  ngOnInit() {
    console.log("id"+ this.id);
    let product= this.productService.getProductFromSession(this.id,this.type);
    if(product.basic.regular_price > 0){
      this.regularprice = product.basic.regular_price; 
    }
    if(product.basic.images.length > 0){
      this.image = product.basic.images[0].src;
    }
    this.productAvailable = true;
  }

}
