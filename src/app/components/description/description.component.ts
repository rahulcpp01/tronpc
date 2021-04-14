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
  public image: string = "";
  public product: any={};
  public display_product: any={}
  public selectedtype: string = "";
  public productname: string = "";
  public imagesarray: string[] = [];
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

    // if(sessionStorage[this.route.snapshot.params["type"]]){
    //   this.product=this.productService.getProductFromSession(this.route.snapshot.params["id"],
    //   this.route.snapshot.params["type"]);
    //   if(this.product.basic.images.length > 0){
    //     this.image = this.product.basic.images[0].src;
    //   }else{
    //     this.image = "../../../assets/images/i3.jpeg";
    //   }
    // }else{
    //   this.product=this.productService.getProductFromSession(this.route.snapshot.params["id"],
    //   "featured_products");
      
    // }

    this.productService.getSingleProduct(this.route.snapshot.params["id"]).subscribe(product => {
      this.selectedtype = this.route.snapshot.params["type"]; 
      this.productname = product.name||"";
      //console.log(product);
      if (this.selectedtype == "processors") {        
        this.product = this.productService.createProcessor(product);
      } else if (this.selectedtype == "cases") {
        this.product = this.productService.createCase(product);
      } else if (this.selectedtype == "coolers") {
        this.product = this.productService.createCooler(product);
      } else if (this.selectedtype == "gpu") {
        this.product = this.productService.createGPU(product);
      } else if (this.selectedtype == "hdds") {
        this.product = this.productService.createHDD(product);
      } else if (this.selectedtype == "m2s") {
        this.product = this.productService.createM2(product);
      } else if (this.selectedtype == "motherboards") {
        this.product = this.productService.createMotherBoard(product);  
      } else if (this.selectedtype == "powersupplies") {
        this.product = this.productService.createPowerSupply(product);
      } else if (this.selectedtype == "rams") {
        this.product = this.productService.createRAM(product);
      } else if (this.selectedtype == "ssds") {
        this.product = this.productService.createSSD(product);
      }
      if (product.images!.length > 0) {
        this.image = product.images![0].src||"";

        product.images?.forEach(pdt =>{
          this.imagesarray.push(pdt.src||"");
        })

      } else {
        this.image = "../../../assets/images/i3.jpeg";
      }
      this.fillDisplayCategory();     
    })

    //this.fillDisplayCategory();
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
