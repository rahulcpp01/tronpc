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
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  public processors: Processor[]=[];
  public cases: Case[] = [];
  public coolers: Cooler[] = [];
  public gpus: GPU[] = [];
  public hdds: HDD[] = [];
  public m2s: M2[] = [];
  public motherboards: MotherBoard[] = [];
  public powersupplys: PowerSupply[] = [];
  public rams: RAM[] = [];
  public ssds: SSD[] = [];


  public selectedProcessor!: Processor;
  
  constructor(private productService: WoocommerceService) {    
  }
  ngOnInit(): void {
    // this.productService.getAllProducts().subscribe(product => {
    //   this.processors=product
    //   console.log(product);
    // })

    this.processors = JSON.parse(sessionStorage["processors"]);
    this.cases = JSON.parse(sessionStorage["cases"]);
    this.coolers = JSON.parse(sessionStorage["coolers"]);
    this.gpus = JSON.parse(sessionStorage["gpu"]);
    this.hdds = JSON.parse(sessionStorage["hdds"]);
    this.m2s = JSON.parse(sessionStorage["m2s"]);
    this.motherboards = JSON.parse(sessionStorage["motherboards"]);
    this.powersupplys = JSON.parse(sessionStorage["powersupplies"]);
    this.rams = JSON.parse(sessionStorage["rams"]);
    this.ssds = JSON.parse(sessionStorage["ssds"]);
  }

  processorChanged(selectedprocessor:any){
    // console.log(selectedprocessor.value);
    this.motherboards=[];
    let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);
    let dummyprocessor = selectedprocessor.value.toUpperCase().split(" ").join("");
    for(let i=0; i< dummymotherboards.length; i++){
      let list= dummymotherboards[i].CPU_SUPPORTED_LIST?.toUpperCase().split(" ").join("");
      if(list?.indexOf(dummyprocessor)!=-1){
        this.motherboards.push(dummymotherboards[i]);
      }            
    }
  }


}
