import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product/product';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  processors: Product[]=[];
  constructor(private productService: WoocommerceService) {    
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(product => {
      this.processors=product
      console.log(product);
    })
  }

}
