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
  public excludedlist: string = "";
  constructor(private productService: WoocommerceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.processor=this.productService.getProductFromSession(this.route.snapshot.params["id"],"processors");
    
    // this.excludedlist = this.processor.exclude!;
    // for(let key in this.processor){
    //   if(this.excludedlist.toLocaleLowerCase().split(" ").join("").indexOf(key.toLocaleLowerCase().split(" ").join("")) != -1){
    //     console.log(key);
    //   }
    // }
  }

}
