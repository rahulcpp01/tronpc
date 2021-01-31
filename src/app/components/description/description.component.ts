import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case } from 'src/models/custommodels/case.model';
import { Cooler } from 'src/models/custommodels/cooler.model';
import { GPU } from 'src/models/custommodels/gpu.model';
import { HDD } from 'src/models/custommodels/hdd.model';
import { M2 } from 'src/models/custommodels/m2.model';
import { MotherBoard } from 'src/models/custommodels/motherboard.model';
import { PowerSupply } from 'src/models/custommodels/powersupply.model';
import { Processor } from 'src/models/custommodels/processor.model';
import { RAM } from 'src/models/custommodels/ram.model';
import { SSD } from 'src/models/custommodels/ssd.model';
import { Product } from 'src/models/product/product';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  public product: any={};
  public display_product: any={}
  // public case: Case={};
  // public cooler: Cooler={};
  // public gpu: GPU={};
  // public hdd: HDD={};
  // public m2: M2={};
  // public motherboard: MotherBoard={};
  // public powersupply: PowerSupply={};
  // public ram: RAM={};
  // public ssd: SSD={};

  constructor(private productService: WoocommerceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(sessionStorage[this.route.snapshot.params["type"]]){
      this.product=this.productService.getProductFromSession(this.route.snapshot.params["id"],
      this.route.snapshot.params["type"]);
    }else{
      this.product=this.productService.getProductFromSession(this.route.snapshot.params["id"],
      "featured_products");
      
    }
    this.fillDisplayCategory();
    // this.processor=this.productService.getProductFromSession(this.route.snapshot.params["id"],"processors");
      

    // this.excludedlist = this.processor.exclude!;
    // for(let key in this.processor){
    //   if(this.excludedlist.toLocaleLowerCase().split(" ").join("").indexOf(key.toLocaleLowerCase().split(" ").join("")) != -1){
    //     console.log(key);
    //   }
    // }
  }

  fillDisplayCategory(){
    let excludedlist = "basic, exclude" + this.product.exclude!;
    for(let key in this.product){
        if(excludedlist.toLocaleLowerCase().split(" ").join("").indexOf(key.toLocaleLowerCase().split(" ").join("")) == -1){
          this.display_product[key]=this.product[key];
        }
        
      }
      
  }

}
