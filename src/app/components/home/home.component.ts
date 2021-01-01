import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product/product';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredProducts!: Product[];
  constructor(private productService :WoocommerceService) { }

  ngOnInit(): void {

    this.productService.getFeaturedProducts().subscribe( p =>{
      this.featuredProducts = p;
    })
  }

  

}
