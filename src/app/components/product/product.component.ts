import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Processor } from 'src/models/custommodels/processor.model';
import { Product } from 'src/models/product/product';
import { WoocommerceService } from 'src/services/woocommerce.service';
import { ProcessorComponent } from '../processor/processor.component';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() imageurl: string="";
  @Input() regular_price: string="";
  @Input() onsale: boolean = false;
  @Input() sale_price: number = 0;  
  @Input() rating: string="";
  
  constructor(private productService: WoocommerceService) { }
   
  ngOnInit() {
    
  }

}
