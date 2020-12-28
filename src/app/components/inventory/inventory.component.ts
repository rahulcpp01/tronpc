import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Processor } from 'src/models/custommodels/processor.model';
import { Product } from 'src/models/product/product';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  processors: Processor[]=[];
  constructor(private productService: WoocommerceService) {    
  }
  ngOnInit(): void {

    this.productService.getAllCategoriesbyId(22).subscribe(product => {
      this.processors=this.productService.processorFactory(product);       
    })
  }

}
