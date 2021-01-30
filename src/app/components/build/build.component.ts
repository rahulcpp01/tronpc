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


  public popup: boolean = false;
  public popupSelectedItem: string = "";

  

  public m2selectable : boolean = true;   //  disable m.2 based on moherboard
  public multiplem2: boolean = false;     //  if mother board allows multiple m2 
  public multiplem2array: number[] = [];  //  to display multiple m2s
  public ssdhddarray: number[] = [];      //  to display multiple ssds hdds
  public ramArray: number[] = [];


  public selectedProcessor!: Processor;
  public selectedMotherBoard!: MotherBoard;
  public selectedRam!: RAM[];
  public selectedM2!: M2;
  public selectedMultipleM2!: M2[];
  public selectedSataSSD!: SSD[];
  public selectedSataHDD!: HDD[];
  public selectedCASE!: Case;
  public selectedCooler!: Cooler;

  public selectedProcessorCompatible: boolean = true;
  public selectedMotherBoardCompatible: boolean = true;
  public selectedRamCompatible: boolean = true;
  public selectedM2Compatible: boolean = true;
  public selectedSATACompatible: boolean = true;


  public buildPrice: number = 0;
  public totalTDP: number = 0;
  
  constructor(private productService: WoocommerceService) {    
  }
  async ngOnInit() {
    // this.productService.getAllProducts().subscribe(product => {
    //   this.processors=product
    //   console.log(product);
    // })
    // await this.productService.waitForSession('processors');
    // this.processors = JSON.parse(sessionStorage["processors"]);
    
    // await this.productService.waitForSession('cases');
    // this.cases = JSON.parse(sessionStorage["cases"]);

    // await this.productService.waitForSession('coolers');
    // this.coolers = JSON.parse(sessionStorage["coolers"]);

    // await this.productService.waitForSession('gpu');
    // this.gpus = JSON.parse(sessionStorage["gpu"]);

    // await this.productService.waitForSession('hdds');
    // this.hdds = JSON.parse(sessionStorage["hdds"]);

    // await this.productService.waitForSession('m2s');
    // this.m2s = JSON.parse(sessionStorage["m2s"]);

    // await this.productService.waitForSession('motherboards');
    // this.motherboards = JSON.parse(sessionStorage["motherboards"]);

    // await this.productService.waitForSession('powersupplies');
    // this.powersupplys = JSON.parse(sessionStorage["powersupplies"]);

    // await this.productService.waitForSession('rams');
    // this.rams = JSON.parse(sessionStorage["rams"]);

    // await this.productService.waitForSession('ssds');
    // this.ssds = JSON.parse(sessionStorage["ssds"]);
    this.productService.getAllProcessors().subscribe(products =>{
      this.productService.processorsFactory(products);
      this.processors = JSON.parse(sessionStorage["processors"]);
    });
  }

  // processorChanged(selectedprocessor:any){
  //   // console.log(selectedprocessor.value);
  //   this.motherboards=[];
  //   let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);
  //   debugger;
  //   let dummyprocessor = selectedprocessor.value.toUpperCase().split(" ").join("");
  //   for(let i=0; i< dummymotherboards.length; i++){
  //     let list= dummymotherboards[i].CPU_SUPPORTED_LIST?.toUpperCase().split(" ").join("");
  //     if(list?.indexOf(dummyprocessor)!=-1){
  //       this.motherboards.push(dummymotherboards[i]);
  //     }            
  //   }
  // }

  // motherBoardChanged(selectedmotherboard: any){
  //   this.m2selectable = true;
  //   let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);
  //   let tempselectedmotherboard = dummymotherboards.find(x=>x.MODEL_NO_MOB === selectedmotherboard.value);
  //   let m2count = tempselectedmotherboard?.M2COUNT;  
  //   this.ssdhddarray = new Array(tempselectedmotherboard?.SATA_SPD_CNT);

  //   if(m2count === 0){
  //     this.m2selectable = false;
  //     this.multiplem2 = false;
  //     this.multiplem2array = new Array(m2count);
      
  //   }else{
  //     this.multiplem2 = true;
  //     this.multiplem2array = new Array(m2count);
  //   }

    
  //   this.selectCaseBasedOnMotherBoard(tempselectedmotherboard?.FORMFACT_MOB!);
    
  // }

  selectM2BasedOnMotherBoard(supportedm2: string){
    debugger;
    let tempmsids= supportedm2.split(' ').join().toLocaleString().toUpperCase();
    
    let tempm2: M2[] = JSON.parse(sessionStorage["m2s"]);
    this.m2s = tempm2.filter(x => tempmsids.indexOf(x.FORM_FACT || '')!=-1);
  }
  selectCaseBasedOnMotherBoard(comptype: string){
    this.cases = [];
    let tempcases: Case[] = JSON.parse(sessionStorage["cases"]);
    this.cases = tempcases.filter(x => x.COMP_TYPE === comptype);

  }

  calculateTotalPrice(){
      this.buildPrice = 0;
      if(this.selectedProcessor){
        this.buildPrice+=Number.parseFloat(this.selectedProcessor.basic?.regular_price||"");
      }
      if(this.selectedMotherBoard){
        this.buildPrice+=Number.parseFloat(this.selectedMotherBoard.basic?.regular_price||"");
      }
      if(this.selectedRam){
        this.selectedRam.forEach(x =>{
          this.buildPrice+=Number.parseFloat(x.basic?.regular_price||"");
        })
        
      }
      if(!this.multiplem2){
        if(this.selectedM2){
          this.buildPrice+=Number.parseFloat(this.selectedM2.basic?.regular_price||"");
        }
      }else{
        if(this.selectedMultipleM2){
          for (let index = 0; index < this.selectedMultipleM2.length; index++) {
            //const element = this.selectedMultipleM2[index];
            this.buildPrice+=Number.parseFloat(this.selectedMultipleM2[index].basic?.regular_price||"");
          }
        }
      }
      if(this.selectedCooler){
        this.buildPrice+=Number.parseFloat(this.selectedCooler.basic?.regular_price||"");
      }
      if(this.selectedCASE){
        this.buildPrice+=Number.parseFloat(this.selectedCASE.basic?.regular_price||"");
      }
      
  }
  procecessorSelected(selected: Processor)
  {
    this.selectedProcessor=selected;
    this.popup=false;

    this.motherboards=[];
    let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);
    
    let dummyprocessor = selected.model?.toUpperCase().split(" ").join("");
    for(let i=0; i< dummymotherboards.length; i++){
      let list= dummymotherboards[i].CPU_SUPPORTED_LIST?.toUpperCase().split(" ").join("");
      if(list?.indexOf(dummyprocessor||'')!=-1){
        this.motherboards.push(dummymotherboards[i]);
      }            
    }
    this.clearSelectedRAM();
    this.updateCooler();
    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  motherboardSelected(selected: MotherBoard){
    this.selectedMotherBoard = selected;
    this.popup = false;
    debugger;
    this.m2selectable = true;
    let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);
    // let tempselectedmotherboard = dummymotherboards.find(x=>x.MODEL_NO_MOB === selected.basic?.name);
    // let m2count = tempselectedmotherboard?.M2COUNT;  
    // this.ssdhddarray = new Array(tempselectedmotherboard?.SATA_SPD_CNT);
    
    let m2count = selected.M2COUNT;  
    this.ssdhddarray = new Array(selected.SATA_SPD_CNT);

    if(m2count === 0){
      this.m2selectable = false;
      this.multiplem2 = false;
      this.multiplem2array = new Array(m2count);
      
    }else{
      this.multiplem2 = true;
      this.multiplem2array = new Array(m2count);
    }

    //this.selectCaseBasedOnMotherBoard(tempselectedmotherboard?.FORMFACT_MOB!);
    this.selectCaseBasedOnMotherBoard(selected?.FORMFACT_MOB!);
    this.selectM2BasedOnMotherBoard(selected.M2!);
    this.clearSelectedRAM();
    this.updateRAM();
    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  ramSelected(selected: RAM){
    
    
    if(!this.selectedRam){
      this.selectedRam=[];
    }
    this.selectedRam.push(selected);
    this.popup = false;


    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  showM2(){
    if(this.multiplem2 || (!this.m2selectable)){
      this.popup=!this.popup;
      this.popupSelectedItem='m2s';
    } else{
      alert("selected Mother Board doesnot support M.2");
    }
  }
  m2Selected(selected: M2){
    this.popup = false;
    if(!this.multiplem2){    
      this.selectedMultipleM2=[]; 
      this.selectedM2 = selected;
    }else{
      this.selectedM2={};
      if(!this.selectedMultipleM2){
        this.selectedMultipleM2=[];
      }
      if(this.multiplem2array.length > this.selectedMultipleM2.length){
        this.selectedMultipleM2.push(selected);
      }
    }

    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  

  checkCompatibility(){

      if(this.selectedProcessor){
        this.selectedProcessorCompatible = this.processors.find( x => (x.basic?.id||0) == this.selectedProcessor.basic?.id) ? true: false;     
      }
      if(this.selectedMotherBoard){
        this.selectedMotherBoardCompatible = this.motherboards.find( x => (x.basic?.id||0) == this.selectedMotherBoard.basic?.id) ? true: false;        
      }
      // if(this.selectedRam){
      //   this.selectedRamCompatible = this.rams.find( x => (x.basic?.id||0) == this.selectedRam.basic?.id) ? true: false;        
      // }
      if(this.selectedM2){
        // this.selectedM2Compatible = !this.m2selectable; //&& this.m2s.find( x => (x.basic?.id||0) == this.selectedRam.basic?.id) 
      }
  }

  updateRAM(){
    if(this.selectedMotherBoard){
      this.ramArray = new Array(this.selectedMotherBoard?.MEM_SLOTS);
      let tempram: RAM[] = JSON.parse(sessionStorage["rams"]);
      this.rams = tempram.filter(x => x.MEM_TYPE_RAM === this.selectedMotherBoard.MEM_TYPE_MOB);
    }    
  }


  clearSelectedRAM(){
    this.selectedRam=[];
    this.ramArray =[];
  }
  selectCase(cse: Case)
  {
    this.selectedCASE = cse;
    this.popup=false;

    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  selectCooler(coolr: Cooler){
    this.selectedCooler = coolr;
    this.popup=false;

    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  updateCooler(){
    this.coolers=[];
    let tempcooler: Cooler[] = JSON.parse(sessionStorage["coolers"]);
    
    tempcooler.forEach( cooler =>{
      if((cooler.CPU_SOCKET_LIST?.toUpperCase().split(" ").join("").indexOf(this.selectedProcessor.socket?.toUpperCase().split(" ").join("")||''))!=-1){
        this.coolers.push(cooler);
      }
    })  
    
  }

  calculateTotalTDP(){
    this.totalTDP = 0;
    if(this.selectedProcessor){
      this.totalTDP+=Number.parseFloat(this.selectedProcessor.TDP?.toString()||"");
    }
    if(this.selectedMotherBoard){
      this.totalTDP+=Number.parseFloat(this.selectedMotherBoard.TDP?.toString()||"");
    }
    if(this.selectedRam){
      this.selectedRam.forEach(x =>{
        this.totalTDP+=Number.parseFloat(x.TDP?.toString()||"");
      })
      
    }
    if(!this.multiplem2){
      if(this.selectedM2){
        this.totalTDP+=Number.parseFloat(this.selectedM2.TDP?.toString()||"");
      }
    }else{
      if(this.selectedMultipleM2){
        for (let index = 0; index < this.selectedMultipleM2.length; index++) {
          //const element = this.selectedMultipleM2[index];
          this.totalTDP+=Number.parseFloat(this.selectedMultipleM2[index].TDP?.toString()||"");
        }
      }
    }
    if(this.selectedCooler){
      this.totalTDP+=Number.parseFloat(this.selectedCooler.TDP?.toString()||"");
    }
    if(this.selectedCASE){
      this.totalTDP+=Number.parseFloat(this.selectedCASE.TDP?.toString()||"");
    }
  }
}
