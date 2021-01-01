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

  ngOnInit(): void {

    this.productService.getFeaturedProducts().subscribe( p =>{
      this.featuredProducts = p;
      console.log(p);
      this.featuredProducts
      for(let i=0; i<this.featuredProducts.length; i++){

      }
      
    })
  }

  

}
