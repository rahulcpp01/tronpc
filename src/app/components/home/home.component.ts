import { Component, OnInit } from '@angular/core';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredProducts!: Product[];

  public featuredprocessors: Processor[]=[];
  public featuredcases: Case[] = [];
  public featuredcoolers: Cooler[] = [];
  public featuredgpus: GPU[] = [];
  public featuredhdds: HDD[] = [];
  public featuredm2s: M2[] = [];
  public featuredmotherboards: MotherBoard[] = [];
  public featuredpowersupplys: PowerSupply[] = [];
  public featuredrams: RAM[] = [];
  public featuredssds: SSD[] = [];
  constructor(private productService :WoocommerceService) { }

  async ngOnInit() {
    await this.productService.waitForSession("featured_products");
    this.featuredProducts = JSON.parse(sessionStorage["featured_products"]);
    for(let i=0; i<this.featuredProducts.length; i++){
      let cattype = this.findCategory(this.featuredProducts[i]);
      console.log(cattype);
      switch(cattype){
        case 'motherboard':{
          this.featuredmotherboards.push(this.productService.createMotherBoard(this.featuredProducts[i]));
          break;
        }
        case 'processor':{
          this.featuredprocessors.push(this.productService.createProcessor(this.featuredProducts[i]));
          break;
        }
        case 'case':{
          this.featuredcases.push(this.productService.createCase(this.featuredProducts[i]));
          break;
        }
        case 'cooler':{
          this.featuredcoolers.push(this.productService.createCooler(this.featuredProducts[i]));
          break;
        }
        case 'gpu':{
          this.featuredgpus.push(this.productService.createGPU(this.featuredProducts[i]));
          break;
        }
        case 'hdd':{
          this.featuredhdds.push(this.productService.createHDD(this.featuredProducts[i]));
          break;
        }
        case 'm2':{
          this.featuredm2s.push(this.productService.createM2(this.featuredProducts[i]));
          break;
        }
        case 'powersupply':{
          this.featuredpowersupplys.push(this.productService.createPowerSupply(this.featuredProducts[i]));
          break;
        }
        case 'ram':{
          this.featuredrams.push(this.productService.createRAM(this.featuredProducts[i]));
          break;
        }
        case 'ssd':{
          this.featuredssds.push(this.productService.createSSD(this.featuredProducts[i]));
          break;
        }
        default:{
          break;
        }
      }
    }
  }
  findCategory(product: Product){
    return product.categories?.[0].name;
  } 

}
