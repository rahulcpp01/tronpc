import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Processor } from 'src/models/custommodels/processor.model';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss']
})
export class ProcessorComponent implements OnInit {

  public processor: Processor={};
  constructor(private productService: WoocommerceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getSingleProduct(Number.parseInt(this.route.snapshot.params["id"])).subscribe( product =>{
      this.processor=this.productService.createProcessor(product);
    })
  }

}
