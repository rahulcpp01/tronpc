import { Component, OnInit, ViewChild } from '@angular/core';
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


  public m2selectable : boolean = true;   //  disable m.2 based on moherboard
  public multiplem2: boolean = false;     //  if mother board allows multiple m2 
  public multiplem2array: number[] = [];  //  to display multiple m2s
  public ssdhddarray: number[] = [];      //  to display multiple ssds hdds


  public selectedProcessor!: Processor;
  
  constructor(private productService: WoocommerceService) {    
  }
  async ngOnInit() {
    // this.productService.getAllProducts().subscribe(product => {
    //   this.processors=product
    //   console.log(product);
    // })
    await this.productService.waitForSession('processors');
    this.processors = JSON.parse(sessionStorage["processors"]);
    
    await this.productService.waitForSession('cases');
    this.cases = JSON.parse(sessionStorage["cases"]);

    await this.productService.waitForSession('coolers');
    this.coolers = JSON.parse(sessionStorage["coolers"]);

    await this.productService.waitForSession('gpu');
    this.gpus = JSON.parse(sessionStorage["gpu"]);

    await this.productService.waitForSession('hdds');
    this.hdds = JSON.parse(sessionStorage["hdds"]);

    await this.productService.waitForSession('m2s');
    this.m2s = JSON.parse(sessionStorage["m2s"]);

    await this.productService.waitForSession('motherboards');
    this.motherboards = JSON.parse(sessionStorage["motherboards"]);

    await this.productService.waitForSession('powersupplies');
    this.powersupplys = JSON.parse(sessionStorage["powersupplies"]);

    await this.productService.waitForSession('rams');
    this.rams = JSON.parse(sessionStorage["rams"]);

    await this.productService.waitForSession('ssds');
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

  motherBoardChanged(selectedmotherboard: any){
    this.m2selectable = true;
    let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);
    let tempselectedmotherboard = dummymotherboards.find(x=>x.MODEL_NO_MOB === selectedmotherboard.value);
    let m2count = tempselectedmotherboard?.M2COUNT;  
    this.ssdhddarray = new Array(tempselectedmotherboard?.SATA_SPD_CNT);

    if(m2count === 0){
      this.m2selectable = false;
      this.multiplem2 = false;
      this.multiplem2array = new Array(m2count);
      
    }else{
      this.multiplem2 = true;
      this.multiplem2array = new Array(m2count);
    }

    this.selectCaseBasedOnMotherBoard(tempselectedmotherboard?.FORMFACT_MOB!);
  }

  selectCaseBasedOnMotherBoard(comptype: string){
    this.cases = [];
    let tempcases: Case[] = JSON.parse(sessionStorage["cases"]);
    this.cases = tempcases.filter(x => x.COMP_TYPE === comptype);

  }
}
