import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
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
import { OrderLine } from 'src/models/orders/order.line';
import { Order } from 'src/models/orders/orders';
import { Product } from 'src/models/product/product';
import { Customer } from 'src/models/user/customer';
import { CartService } from 'src/services/cart.service';
import { EncryptDecryptService } from 'src/services/encrypt-decrypt.service';
import { UserService } from 'src/services/user.service';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit, OnDestroy {

  public processors: Processor[] = [];
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



  public m2selectable: boolean = true;   //  disable m.2 based on moherboard
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
  public selectedPowerSupply!: PowerSupply;

  public selectedProcessorCompatible: boolean = true;
  public selectedMotherBoardCompatible: boolean = true;
  public selectedRamCompatible: boolean = true;
  public selectedM2Compatible: boolean = true;
  public selectedSATACompatible: boolean = true;


  public buildPrice: number = 0;
  public totalTDP: number = 0;


  public buildurl: string = "";

  indianStates = environment.states;
  public userdetails: Customer = {
    first_name: "",
    last_name: "",
    email: "",
    billing: {
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      phone: ""
    },
    shipping: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    }
  };

  constructor(private productService: WoocommerceService,
    private cartService: CartService,
    private userService: UserService,
    private encryptDecryptService:EncryptDecryptService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnDestroy(): void {
    this.saveBuildLocally();
  }
  saveBuildLocally() {
    let motherboardselected = false;
    let querystring= "";
    if (this.selectedProcessor && Object.keys(this.selectedProcessor).length > 0) {
      //localStorage["selectedProcessor"]=JSON.stringify(this.selectedProcessor);
      querystring+="proc="+this.selectedProcessor.id;
    }
    if (this.selectedMotherBoard && Object.keys(this.selectedMotherBoard).length > 0) {
      //localStorage["selectedMotherBoard"]= JSON.stringify(this.selectedMotherBoard);
      querystring+="&motr="+this.selectedMotherBoard.id;
      motherboardselected=true;
    }
    if (this.selectedRam && Object.keys(this.selectedRam).length > 0) {
      //localStorage["selectedRam"]= JSON.stringify(this.selectedRam);
      querystring+="&rams=";
      this.selectedRam.forEach(sram => {
        querystring+=sram.id+"+";
      })
    }
    if(motherboardselected)
      querystring+="&mulm2flag="+this.multiplem2;
    //localStorage["multiplem2"]= this.multiplem2;


    //localStorage ["multiplem2array"] = JSON.stringify(this.multiplem2array);

    if (!this.multiplem2) {
      if (this.selectedM2 && Object.keys(this.selectedM2).length > 0) {
        //localStorage["selectedM2"]= JSON.stringify(this.selectedM2);
        querystring+="&m2="+this.selectedM2.id;
      }
    } else {
      if (this.selectedMultipleM2 && Object.keys(this.selectedMultipleM2).length > 0) {
        
        //localStorage["selectedMultipleM2"]= JSON.stringify(this.selectedMultipleM2);
        querystring+="&m2arr=";
        this.selectedMultipleM2.forEach(m2 => {
          querystring+=m2.id+"+";
        })

      }
    }
    //SATA
    //localStorage["ssdhddarray"]= this.ssdhddarray;   
    if (this.ssdhddarray.length > 0) {
      if (this.selectedSataSSD && Object.keys(this.selectedSataSSD).length > 0){
        //localStorage["selectedSataSSD"]= JSON.stringify(this.selectedSataSSD);        
        querystring+="&ssdarr=";
        this.selectedSataSSD.forEach(ssd => {
          querystring+=ssd.id+"+";
        })
      }
      

      if (this.selectedSataHDD && Object.keys(this.selectedSataHDD).length > 0){
        //localStorage["selectedSataHDD"]= JSON.stringify(this.selectedSataHDD); 
        querystring+="&hddarr=";
        this.selectedSataHDD.forEach(hdd => {
          querystring+=hdd.id+"+";
        })  
      }
         
    }

    if (this.selectedCooler && Object.keys(this.selectedCooler).length > 0) {
      //localStorage["selectedCooler"]= JSON.stringify(this.selectedCooler);
      querystring+="&cooler="+this.selectedCooler.id;
    }
    if (this.selectedCASE && Object.keys(this.selectedCASE).length > 0) {
      //localStorage["selectedCASE"]= JSON.stringify(this.selectedCASE);
      querystring+="&case="+this.selectedCASE.id;
    }
    if (this.selectedPowerSupply && Object.keys(this.selectedPowerSupply).length > 0) {
      //localStorage["selectedPowerSupply"]= JSON.stringify(this.selectedPowerSupply);
      querystring+="&power="+this.selectedPowerSupply.id;
    }
    localStorage["build"] = btoa(querystring);
    this.buildurl = "https://skyblu.xyz/#/build?build="+ localStorage["build"];
    console.log('URL : https://skyblu.xyz/#/build?build='+ btoa(querystring));
  }

  copyBuildUrl(){
    this.saveBuildLocally();
  }

  clearLocalStorage(){
    localStorage.removeItem("selectedProcessor");
    localStorage.removeItem("selectedMotherBoard");
    localStorage.removeItem("selectedRam");
    localStorage.removeItem("multiplem2");
    localStorage.removeItem("selectedM2");
    localStorage.removeItem("selectedMultipleM2");
    localStorage.removeItem("ssdhddarray");
    localStorage.removeItem("selectedSataSSD");
    localStorage.removeItem("selectedSataHDD");
    localStorage.removeItem("selectedCooler");
    localStorage.removeItem("selectedCASE");
    localStorage.removeItem("selectedPowerSupply");
  }

  // loadBuildFromLocal(){
  //   if(localStorage["selectedProcessor"]){
  //     //this.selectedProcessor = JSON.parse(localStorage["selectedProcessor"]);
  //     this.procecessorSelected(JSON.parse(localStorage["selectedProcessor"]));
  //   }
  //   if(localStorage["selectedMotherBoard"]){
  //     //this.selectedMotherBoard = JSON.parse(localStorage["selectedMotherBoard"]);
  //     this.motherboardSelected(JSON.parse(localStorage["selectedMotherBoard"]));
  //   }
  //   if (localStorage["selectedRam"]) {
  //     this.selectedRam = JSON.parse(localStorage["selectedRam"]);
  //   }
    
  //   this.multiplem2array = JSON.parse(localStorage["multiplem2array"]);

  //   if (localStorage["multiplem2"]=="false") {
  //     if (localStorage["selectedRam"]) {
  //       this.selectedM2 = localStorage["selectedM2"];
  //     }
  //   } else {
  //     if (localStorage["selectedMultipleM2"]) {
  //       this.selectedMultipleM2 = localStorage["selectedMultipleM2"];
  //     }
  //   }
  //   //SATA
  //   // if (this.ssdhddarray.length > 0) {
  //   //   this.selectedSataSSD.forEach(x => {
  //   //     this.buildPrice += Number.parseFloat(x.basic?.regular_price || "");
  //   //   })
  //   //   this.selectedSataHDD.forEach(x => {
  //   //     this.buildPrice += Number.parseFloat(x.basic?.regular_price || "");
  //   //   })
  //   // }

  //   if (localStorage["selectedCooler"]) {
  //     this.selectedCooler = JSON.parse(localStorage["selectedCooler"]);
  //     //this.selectCooler()
  //   }
  //   if (localStorage["selectedCASE"]) {
  //     this.selectedCASE = JSON.parse(localStorage["selectedCASE"]);
  //   }
  //   if (localStorage["selectedPowerSupply"]) {
  //     this.selectedPowerSupply = JSON.parse(localStorage["selectedPowerSupply"]);
  //   }
  //   this.clearLocalStorage();
  // }

  
  loadBuildFromLocal(build: any){
    //let build = localStorage["build"];
    if(build){
      let config = build.split('&');

      //For Processor
      if(build.indexOf('proc')> -1){
        let selectedprocessorid = config.find((x:string)=>x.indexOf('proc')!=-1).substr(5);
        this.productService.getSingleProduct(selectedprocessorid).subscribe(proc =>{
          this.procecessorSelected(this.productService.createProcessor(proc));

          //For Mother Board
          if(build.indexOf('motr')> -1){
            let selectedmotherboardid = config.find((x:string)=>x.indexOf('motr')!=-1).substr(5);
            this.productService.getSingleProduct(selectedmotherboardid).subscribe(proc =>{
              this.motherboardSelected(this.productService.createMotherBoard(proc));

              //For RAMS
              if(build.indexOf('rams')> -1){
                let selectedramids = config.find((x:string)=>x.indexOf('rams')!=-1).substr(5).split('+');                
                selectedramids.forEach((ramid: any)=> {         
                  if(ramid != ""){
                    this.productService.getSingleProduct(ramid).subscribe( sram =>{
                      this.selectedRam.push(this.productService.createRAM(sram));
                      this.calculateTotalPrice();
                      this.calculateTotalTDP();
                    })
                  }                      
                });

              }

              if(build.indexOf('mulm2flag')> -1){
                this.multiplem2 = config.find((x:string)=>x.indexOf('mulm2flag')!=-1).substr(10);
              }
              if (!this.multiplem2) {
                if(build.indexOf('m2')> -1) {
                  let selectedm2id = config.find((x:string)=>x.indexOf('m2')!=-1).substr(3);
                  this.productService.getSingleProduct(selectedm2id).subscribe(sm2 =>{
                    this.selectedM2 = this.productService.createM2(sm2);
                    this.calculateTotalPrice();
                    this.calculateTotalTDP();
                  })
                  //this.selectedM2 = localStorage["selectedM2"];
                }
              } else {
                if(build.indexOf('m2arr')> -1) {
                  
                    let selectedm2arrids = config.find((x:string)=>x.indexOf('m2arr')!=-1).substr(6).split('+');                
                    selectedm2arrids.forEach((m2id: any)=> {         
                      if(m2id != ""){
                        this.productService.getSingleProduct(m2id).subscribe( ssm2 =>{
                          this.selectedMultipleM2.push(this.productService.createM2(ssm2));
                          this.calculateTotalPrice();
                          this.calculateTotalTDP();
                        })
                      }                      
                    });
    
                  
                  //this.selectedMultipleM2 = localStorage["selectedMultipleM2"];
                }
              }

              //FOR SSD
              if(build.indexOf('ssdarr')> -1){
                let selectedssdarrids = config.find((x:string)=>x.indexOf('ssdarr')!=-1).substr(7).split('+');                
                selectedssdarrids.forEach((ssdid: any)=> {         
                  if(ssdid != ""){
                    this.productService.getSingleProduct(ssdid).subscribe( sssd =>{
                      this.selectedSataSSD.push(this.productService.createSSD(sssd));
                      this.calculateTotalPrice();
                      this.calculateTotalTDP();
                    })
                  }                      
                });
              }

              //FOR HDD
              if(build.indexOf('hddarr')> -1){
                let selectedhddarrids = config.find((x:string)=>x.indexOf('hddarr')!=-1).substr(7).split('+');                
                selectedhddarrids.forEach((hddid: any)=> {         
                  if(hddid != ""){
                    this.productService.getSingleProduct(hddid).subscribe( shdd =>{
                      this.selectedSataHDD.push(this.productService.createHDD(shdd));
                      this.calculateTotalPrice();
                      this.calculateTotalTDP();
                    })
                  }                      
                });
              }


              //For Cooler
              if(build.indexOf('cooler')> -1){
                let selectedcoolerid = config.find((x:string)=>x.indexOf('cooler')!=-1).substr(7);
                this.productService.getSingleProduct(selectedcoolerid).subscribe( scooler =>{
                  this.selectedCooler = this.productService.createCooler(scooler);
                  this.calculateTotalPrice();
                  this.calculateTotalTDP();
                })
              }

               //For Case
               if(build.indexOf('case')> -1){
                let selectedcaseid = config.find((x:string)=>x.indexOf('case')!=-1).substr(5);
                this.productService.getSingleProduct(selectedcaseid).subscribe( scase =>{
                  this.selectedCASE = this.productService.createCase(scase);
                  this.calculateTotalPrice();
                  this.calculateTotalTDP();
                })
              }


               //For Power Supply
               if(build.indexOf('power')> -1){
                let selectedpowerid = config.find((x:string)=>x.indexOf('power')!=-1).substr(6);
                this.productService.getSingleProduct(selectedpowerid).subscribe( spower =>{
                  this.selectedPowerSupply = this.productService.createPowerSupply(spower);
                  this.calculateTotalPrice();
                  this.calculateTotalTDP();
                })
              }

            })
          }

        })
      }
     
    }
    // if(localStorage["selectedProcessor"]){
    //   //this.selectedProcessor = JSON.parse(localStorage["selectedProcessor"]);
    //   this.procecessorSelected(JSON.parse(localStorage["selectedProcessor"]));
    // }
    // if(localStorage["selectedMotherBoard"]){
    //   //this.selectedMotherBoard = JSON.parse(localStorage["selectedMotherBoard"]);
    //   this.motherboardSelected(JSON.parse(localStorage["selectedMotherBoard"]));
    // }
    // if (localStorage["selectedRam"]) {
    //   this.selectedRam = JSON.parse(localStorage["selectedRam"]);
    // }
    
    //this.multiplem2array = JSON.parse(localStorage["multiplem2array"]);

    // if (localStorage["multiplem2"]=="false") {
    //   if (localStorage["selectedRam"]) {
    //     this.selectedM2 = localStorage["selectedM2"];
    //   }
    // } else {
    //   if (localStorage["selectedMultipleM2"]) {
    //     this.selectedMultipleM2 = localStorage["selectedMultipleM2"];
    //   }
    // }
    //SATA
    // if (this.ssdhddarray.length > 0) {
    //   this.selectedSataSSD.forEach(x => {
    //     this.buildPrice += Number.parseFloat(x.basic?.regular_price || "");
    //   })
    //   this.selectedSataHDD.forEach(x => {
    //     this.buildPrice += Number.parseFloat(x.basic?.regular_price || "");
    //   })
    // }

    // if (localStorage["selectedCooler"]) {
    //   this.selectedCooler = JSON.parse(localStorage["selectedCooler"]);
    //   //this.selectCooler()
    // }
    // if (localStorage["selectedCASE"]) {
    //   this.selectedCASE = JSON.parse(localStorage["selectedCASE"]);
    // }
    // if (localStorage["selectedPowerSupply"]) {
    //   this.selectedPowerSupply = JSON.parse(localStorage["selectedPowerSupply"]);
    // }
    //this.clearLocalStorage();
  }
  async ngOnInit() {
    // this.productService.getAllProducts().subscribe(product => {
    //   this.processors=product
    //   console.log(product);
    // })

    //#OL
    // await this.productService.waitForSession('processors');
    // this.processors = JSON.parse(sessionStorage["processors"]);
    //#OL

    //#NL
    this.productService.getAllProcessors().subscribe(product =>{
      this.processors = this.productService.processorsFactoryMain(product);
    });
    //#NL

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

    // this.productService.getAllProcessors().subscribe(products => {
    //   this.productService.processorsFactory(products);
    //   this.processors = JSON.parse(sessionStorage["processors"]);
    // });

    // let userData = this.userService.getUserInfo();     
    //   if (userData) {
    //       this.userdetails = this.encryptDecryptService.decryptData(userData);
    //       // this.isRegisteredUser = true;
    //       // this.edit_shipping_address = false;
    //       // this.shippingstate = this.indianStates.find(x => x.value == this.userdetails.shipping.state).name;
    //       // this.cartService.cartData.subscribe(data => {
    //       //     this.cartitems = data;
    //       // });
         

    //   } else {
    //       //this.edit_shipping_address = true;
    //   }

    let buildquery = this.route
    .queryParams
    .subscribe(params => {
      
      // Defaults to 0 if no query param provided.
      let buildvar = params['build'] || "";


      if(buildvar==""){
        if(localStorage["build"]){
          this.loadBuildFromLocal(atob(localStorage["build"]));
        }        
      }else{        
        this.loadBuildFromLocal(atob(buildvar));
      }
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

  async selectM2BasedOnMotherBoard(supportedm2: string) {
    let tempmsids = supportedm2.split(' ').join().toLocaleString().toUpperCase();

    //#OL
    // await this.productService.waitForSession('m2s');
    // let tempm2: M2[] = JSON.parse(sessionStorage["m2s"]);
    // this.m2s = tempm2.filter(x => tempmsids.indexOf(x.FORM_FACT || '') != -1);
    //#OL
    this.productService.getAllM2s().subscribe(product =>{
      let tempm2 = this.productService.M2sFactoryMain(product);
      this.m2s = tempm2.filter(x => tempmsids.indexOf(x.FORM_FACT || '') != -1);
    });

  }
  async selectCaseBasedOnMotherBoard(comptype: string) {
    this.cases = [];

    //#OL
    // await this.productService.waitForSession('cases');
    // let tempcases: Case[] = JSON.parse(sessionStorage["cases"]);
    // this.cases = tempcases.filter(x => x.COMP_TYPE === comptype);
    //#OL
    this.productService.getAllCases().subscribe(product =>{
      let tempcases = this.productService.casesFactoryMain(product);
      this.cases = tempcases.filter(x => x.COMP_TYPE === comptype);
    });

  }

  async selectHDDs() {
    //#OL
    // await this.productService.waitForSession('hdds');
    // this.hdds = JSON.parse(sessionStorage["hdds"]);
    //#OL
    this.productService.getAllHDDs().subscribe(product =>{
      this.hdds = this.productService.hddsFactoryMain(product);
    });
  }
  async selectSSDs() {
    //#OL
    // await this.productService.waitForSession('ssds');
    // this.ssds = JSON.parse(sessionStorage["ssds"]);
    //#OL
    this.productService.getAllSSDs().subscribe(product =>{
      this.ssds = this.productService.SSDsFactoryMain(product);
    });
  }
  async selectCases() {
    //#OL
    // await this.productService.waitForSession('cases');
    // let tempcases: Case[] = JSON.parse(sessionStorage["cases"]);
    // this.cases = tempcases.filter(x => x.COMP_TYPE === this.selectedMotherBoard.FORMFACT_MOB);
    //#OL
    this.productService.getAllCases().subscribe(product =>{
      let tempcases = this.productService.casesFactoryMain(product);
      this.cases = tempcases.filter(x => x.COMP_TYPE === this.selectedMotherBoard.FORMFACT_MOB);
    });

  }
  async selectPowerSupplies() {
    // await this.productService.waitForSession('powersupplies');
    // this.powersupplys = JSON.parse(sessionStorage["powersupplies"]);
    this.productService.getAllPowerSupplies().subscribe(product =>{
      this.powersupplys = this.productService.processorsFactoryMain(product);
    });
  }
  calculateTotalPrice() {
    this.buildPrice = 0;
    if (this.selectedProcessor && Object.keys(this.selectedProcessor).length > 0) {
      this.buildPrice += Number.parseFloat(this.selectedProcessor.basic?.regular_price || "");
    }
    if (this.selectedMotherBoard && Object.keys(this.selectedMotherBoard).length > 0) {
      this.buildPrice += Number.parseFloat(this.selectedMotherBoard.basic?.regular_price || "");
    }
    if (this.selectedRam && Object.keys(this.selectedRam).length > 0) {
      this.selectedRam.forEach(x => {
        this.buildPrice += Number.parseFloat(x.basic?.regular_price || "");
      })

    }
    if (!this.multiplem2) {
      if (this.selectedM2 && Object.keys(this.selectedM2).length > 0) {
        this.buildPrice += Number.parseFloat(this.selectedM2.basic?.regular_price || "");
      }
    } else {
      if (this.selectedMultipleM2) {
        for (let index = 0; index < this.selectedMultipleM2.length; index++) {
          //const element = this.selectedMultipleM2[index];
          this.buildPrice += Number.parseFloat(this.selectedMultipleM2[index].basic?.regular_price || "");
        }
      }
    }
    //SATA
    if (this.ssdhddarray.length > 0) {
      this.selectedSataSSD.forEach(x => {
        this.buildPrice += Number.parseFloat(x.basic?.regular_price || "");
      })
      this.selectedSataHDD.forEach(x => {
        this.buildPrice += Number.parseFloat(x.basic?.regular_price || "");
      })
    }

    if (this.selectedCooler && Object.keys(this.selectedCooler).length > 0) {
      this.buildPrice += Number.parseFloat(this.selectedCooler.basic?.regular_price || "");
    }
    if (this.selectedCASE && Object.keys(this.selectedCASE).length > 0) {
      this.buildPrice += Number.parseFloat(this.selectedCASE.basic?.regular_price || "");
    }
    if (this.selectedPowerSupply && Object.keys(this.selectedPowerSupply).length > 0) {
      this.buildPrice += Number.parseFloat(this.selectedPowerSupply.basic?.regular_price || "");
    }
  }
  async procecessorSelected(selected: Processor) {
    this.selectedProcessor = selected;
    this.popup = false;
    this.clearSelectedMotherBoard();
    // this.clearSelectedRAM();
    // this.clearSelectedM2();
    // this.clearSelectedSATA();
    // this.clearSelectedCase();
    // this.clearSelectedCooler();
    this.motherboards = [];

    //#OL
    // await this.productService.waitForSession('motherboards');
    // let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);

    // let dummyprocessor = selected.model?.toUpperCase().split(" ").join("");
    // for (let i = 0; i < dummymotherboards.length; i++) {
    //   let list = dummymotherboards[i].CPU_SUPPORTED_LIST?.toUpperCase().split(" ").join("");
    //   if (list?.indexOf(dummyprocessor || '') != -1) {
    //     this.motherboards.push(dummymotherboards[i]);
    //   }
    // }

    // this.updateCooler();
    // this.checkCompatibility();
    // this.calculateTotalPrice();
    // this.calculateTotalTDP();
    //#OL

    this.productService.getAllMotherBoards().subscribe(product =>{
      let dummymotherboards = this.productService.motherBoardsFactoryMain(product);
      let dummyprocessor = selected.model?.toUpperCase().split(" ").join("");
    for (let i = 0; i < dummymotherboards.length; i++) {
      let list = dummymotherboards[i].CPU_SUPPORTED_LIST?.toUpperCase().split(" ").join("");
      if (list?.indexOf(dummyprocessor || '') != -1) {
        this.motherboards.push(dummymotherboards[i]);
      }
    }

    this.updateCooler();
    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
    });
  }

  async motherboardSelected(selected: MotherBoard) {
    this.clearSelectedRAM();
    this.clearSelectedM2();
    this.clearSelectedSATA();
    this.clearSelectedCase();
    this.clearSelectedCooler();
    this.clearSelectedPowerSupply();
    this.selectedMotherBoard = selected;
    this.popup = false;
    this.m2selectable = true;

    //#OL
    // await this.productService.waitForSession('motherboards');
    // let dummymotherboards: MotherBoard[] = JSON.parse(sessionStorage["motherboards"]);
    // // let tempselectedmotherboard = dummymotherboards.find(x=>x.MODEL_NO_MOB === selected.basic?.name);
    // // let m2count = tempselectedmotherboard?.M2COUNT;  
    // // this.ssdhddarray = new Array(tempselectedmotherboard?.SATA_SPD_CNT);

    // let m2count = selected.M2COUNT;
    // this.ssdhddarray = new Array(selected.SATA_SPD_CNT);

    // if (m2count === 0) {
    //   this.m2selectable = false;
    //   this.multiplem2 = false;
    //   this.multiplem2array = new Array(m2count);

    // } else {
    //   this.multiplem2 = true;
    //   this.multiplem2array = new Array(m2count);
    // }

    // //this.selectCaseBasedOnMotherBoard(tempselectedmotherboard?.FORMFACT_MOB!);
    // this.selectCaseBasedOnMotherBoard(selected?.FORMFACT_MOB!);
    // this.selectM2BasedOnMotherBoard(selected.M2!);

    // this.selectHDDs();
    // this.selectSSDs();
    // this.selectCases();
    // this.selectPowerSupplies();

    // this.updateRAM();
    // this.checkCompatibility();
    // this.calculateTotalPrice();
    // this.calculateTotalTDP();
    //#OL

    let m2count = selected.M2COUNT;
    this.ssdhddarray = new Array(selected.SATA_SPD_CNT);

    if (m2count === 0) {
      this.m2selectable = false;
      this.multiplem2 = false;
      this.multiplem2array = new Array(m2count);

    } else {
      this.multiplem2 = true;
      this.multiplem2array = new Array(m2count);
    }

    //this.selectCaseBasedOnMotherBoard(tempselectedmotherboard?.FORMFACT_MOB!);
    this.selectCaseBasedOnMotherBoard(selected?.FORMFACT_MOB!);
    this.selectM2BasedOnMotherBoard(selected.M2!);

    this.selectHDDs();
    this.selectSSDs();
    this.selectCases();
    this.selectPowerSupplies();

    this.updateRAM();
    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  ramSelected(selected: RAM) {


    if (!this.selectedRam) {
      this.selectedRam = [];
    }
    if (this.ramArray.length > this.selectedRam.length) {
      this.selectedRam.push(selected);
      this.checkCompatibility();
      this.calculateTotalPrice();
      this.calculateTotalTDP();
    } else {
      alert("You have added max number of supported RAMS");
    }

    this.popup = false;
  }

  showM2() {
    if (this.multiplem2 || (!this.m2selectable)) {
      this.popup = !this.popup;
      this.popupSelectedItem = 'm2s';
    } else {
      alert("selected Mother Board doesnot support M.2");
    }
  }
  m2Selected(selected: M2) {
    this.popup = false;
    if (!this.multiplem2) {
      this.selectedMultipleM2 = [];
      this.selectedM2 = selected;
    } else {
      this.selectedM2 = {};
      if (!this.selectedMultipleM2) {
        this.selectedMultipleM2 = [];
      }
      if (this.multiplem2array.length > this.selectedMultipleM2.length) {
        this.selectedMultipleM2.push(selected);
      }
    }

    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }


  checkCompatibility() {

    if (this.selectedProcessor) {
      //this.selectedProcessorCompatible = this.processors.find( x => (x.basic?.id||0) == this.selectedProcessor.basic?.id) ? true: false;     
    }
    if (this.selectedMotherBoard) {
      //this.selectedMotherBoardCompatible = this.motherboards.find( x => (x.basic?.id||0) == this.selectedMotherBoard.basic?.id) ? true: false;        
    }
    // if(this.selectedRam){
    //   this.selectedRamCompatible = this.rams.find( x => (x.basic?.id||0) == this.selectedRam.basic?.id) ? true: false;        
    // }
    if (this.selectedM2) {
      // this.selectedM2Compatible = !this.m2selectable; //&& this.m2s.find( x => (x.basic?.id||0) == this.selectedRam.basic?.id) 
    }
  }

  async updateRAM() {
    if (this.selectedMotherBoard) {
      this.ramArray = new Array(this.selectedMotherBoard?.MEM_SLOTS);
      //#OL
      // await this.productService.waitForSession('rams');
      // let tempram: RAM[] = JSON.parse(sessionStorage["rams"]);
      // this.rams = tempram.filter(x => x.MEM_TYPE_RAM === this.selectedMotherBoard.MEM_TYPE_MOB);
      //#OL
      this.productService.getAllRAMs().subscribe(product =>{
        let tempram = this.productService.RAMsFactoryMain(product);
        this.rams = tempram.filter(x => x.MEM_TYPE_RAM === this.selectedMotherBoard.MEM_TYPE_MOB);
      });
    }
  }
  clearSelectedProcessor() {
    this.selectedProcessor = {};
    this.clearSelectedMotherBoard();
  }

  clearSelectedMotherBoard() {
    this.selectedMotherBoard = {};
    this.clearSelectedRAM();
    this.clearSelectedM2();
    this.clearSelectedSATA();
    this.clearSelectedCase();
    this.clearSelectedCooler();
    this.clearSelectedPowerSupply();
  }
  clearSelectedRAM() {
    this.selectedRam = [];
    this.ramArray = [];
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  clearSelectedRAM2() {
    this.selectedRam = [];
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  clearSelectedM2() {
    this.selectedM2 = {};
    this.selectedMultipleM2 = [];
    // this.multiplem2 = false;
    this.multiplem2array = [];
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  clearSelectedM22() {
    this.selectedM2 = {};
    this.selectedMultipleM2 = [];
    // this.multiplem2 = false;
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  clearSelectedSATA() {
    this.ssdhddarray = [];
    this.selectedSataSSD = [];
    this.selectedSataHDD = [];
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  clearSelectedSATA2() {
    this.selectedSataSSD = [];
    this.selectedSataHDD = [];
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }

  clearSelectedCooler() {
    this.selectedCooler = {}
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  clearSelectedCase() {
    this.selectedCASE = {}
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  clearSelectedPowerSupply() {
    this.selectedPowerSupply = {};
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  selectHDD(hdd: HDD) {
    if (this.ssdhddarray.length > (this.selectedSataHDD.length + this.selectedSataSSD.length)) {
      this.selectedSataHDD.push(hdd);
      this.checkCompatibility();
      this.calculateTotalPrice();
      this.calculateTotalTDP();
    } else {
      alert("You have added Maximum number of SSD's and HDDS allowed by processor");
    }
    this.popup = false;
  }
  selectSSD(ssd: SSD) {
    if (this.ssdhddarray.length > (this.selectedSataHDD.length + this.selectedSataSSD.length)) {

      this.selectedSataSSD.push(ssd);

      this.checkCompatibility();
      this.calculateTotalPrice();
      this.calculateTotalTDP();
    } else {
      alert("You have added Maximum number of SSD's and HDDS allowed by processor");
    }
    this.popup = false;
  }
  selectCase(cse: Case) {
    this.selectedCASE = cse;
    this.popup = false;

    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  selectCooler(coolr: Cooler) {
    this.selectedCooler = coolr;
    this.popup = false;

    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  selectPowerSupply(power: PowerSupply) {
    this.selectedPowerSupply = power;
    this.popup = false;

    this.checkCompatibility();
    this.calculateTotalPrice();
    this.calculateTotalTDP();
  }
  async updateCooler() {
    this.coolers = [];
    //#OL
    // await this.productService.waitForSession('coolers');
    // let tempcooler: Cooler[] = JSON.parse(sessionStorage["coolers"]);

    // tempcooler.forEach(cooler => {
    //   if ((cooler.CPU_SOCKET_LIST?.toUpperCase().split(" ").join("").indexOf(this.selectedProcessor.socket?.toUpperCase().split(" ").join("") || '')) != -1) {
    //     this.coolers.push(cooler);
    //   }
    // })
    //#OL

    this.productService.getAllCoolers().subscribe(product =>{
      let tempcooler = this.productService.coolersFactoryMain(product);

      tempcooler.forEach(cooler => {
        if ((cooler.CPU_SOCKET_LIST?.toUpperCase().split(" ").join("").indexOf(this.selectedProcessor.socket?.toUpperCase().split(" ").join("") || '')) != -1) {
          this.coolers.push(cooler);
        }
      })
    });

  }

  calculateTotalTDP() {
    this.totalTDP = 0;
    if (this.selectedProcessor && Object.keys(this.selectedProcessor).length > 0) {
      this.totalTDP += Number.parseFloat(this.selectedProcessor.TDP?.toString() || "");
    }
    if (this.selectedMotherBoard && Object.keys(this.selectedMotherBoard).length > 0) {
      this.totalTDP += Number.parseFloat(this.selectedMotherBoard.TDP?.toString() || "");
    }
    if (this.selectedRam && Object.keys(this.selectedRam).length > 0) {
      this.selectedRam.forEach(x => {
        this.totalTDP += Number.parseFloat(x.TDP?.toString() || "");
      })

    }
    if (!this.multiplem2) {
      if (this.selectedM2 && Object.keys(this.selectedM2).length > 0) {
        this.totalTDP += Number.parseFloat(this.selectedM2.TDP?.toString() || "");
      }
    } else {
      if (this.selectedMultipleM2) {
        for (let index = 0; index < this.selectedMultipleM2.length; index++) {
          //const element = this.selectedMultipleM2[index];
          this.totalTDP += Number.parseFloat(this.selectedMultipleM2[index].TDP?.toString() || "");
        }
      }
    }
    //SATA
    if (this.ssdhddarray.length > 0) {
      this.selectedSataSSD.forEach(x => {
        this.totalTDP += Number.parseFloat(x.TDP?.toString() || "");
      })
      this.selectedSataHDD.forEach(x => {
        this.totalTDP += Number.parseFloat(x.TDP?.toString() || "");
      })
    }

    if (this.selectedCooler && Object.keys(this.selectedCooler).length > 0) {
      this.totalTDP += Number.parseFloat(this.selectedCooler.TDP?.toString() || "");
    }

  }

  async placeOrder() {
    const lineItems: OrderLine[] = [];
    if (this.selectedProcessor && Object.keys(this.selectedProcessor).length > 0) {

      lineItems.push({
        name: this.selectedProcessor.basic?.name || "",
        product_id: this.selectedProcessor.basic?.id || 0,
        quantity: 1
      });
    }
    if (this.selectedMotherBoard && Object.keys(this.selectedMotherBoard).length > 0) {
      lineItems.push({
        name: this.selectedMotherBoard.basic?.name || "",
        product_id: this.selectedMotherBoard.basic?.id || 0,
        quantity: 1
      });
    }
    if (this.selectedRam && Object.keys(this.selectedRam).length > 0) {
      this.selectedRam.forEach(x => {
        lineItems.push({
          name: x.basic?.name || "",
          product_id: x.basic?.id || 0,
          quantity: 1
        });
      })

    }
    if (!this.multiplem2) {
      if (this.selectedM2 && Object.keys(this.selectedM2).length > 0) {
        //this.buildPrice+=Number.parseFloat(this.selectedM2.basic?.regular_price||"");
        lineItems.push({
          name: this.selectedM2.basic?.name || "",
          product_id: this.selectedM2.basic?.id || 0,
          quantity: 1
        });
      }
    } else {
      if (this.selectedMultipleM2) {
        for (let index = 0; index < this.selectedMultipleM2.length; index++) {
          //const element = this.selectedMultipleM2[index];
          //this.buildPrice+=Number.parseFloat(this.selectedMultipleM2[index].basic?.regular_price||"");
          lineItems.push({
            name: this.selectedMultipleM2[index].basic?.name || "",
            product_id: this.selectedMultipleM2[index].basic?.id || 0,
            quantity: 1
          });

        }
      }
    }
    //SATA
    if (this.ssdhddarray.length > 0) {
      this.selectedSataSSD.forEach(x => {
        //this.buildPrice+=Number.parseFloat(x.basic?.regular_price||"");
        lineItems.push({
          name: x.basic?.name || "",
          product_id: x.basic?.id || 0,
          quantity: 1
        });
      })
      this.selectedSataHDD.forEach(x => {
        //this.buildPrice+=Number.parseFloat(x.basic?.regular_price||"");
        lineItems.push({
          name: x.basic?.name || "",
          product_id: x.basic?.id || 0,
          quantity: 1
        });
      })
    }

    if (this.selectedCooler && Object.keys(this.selectedCooler).length > 0) {
      //this.buildPrice+=Number.parseFloat(this.selectedCooler.basic?.regular_price||"");
      lineItems.push({
        name: this.selectedCooler.basic?.name || "",
        product_id: this.selectedCooler.basic?.id || 0,
        quantity: 1
      });
    }
    if (this.selectedCASE && Object.keys(this.selectedCASE).length > 0) {
      //this.buildPrice+=Number.parseFloat(this.selectedCASE.basic?.regular_price||"");
      lineItems.push({
        name: this.selectedCASE.basic?.name || "",
        product_id: this.selectedCASE.basic?.id || 0,
        quantity: 1
      });

    }
    if (this.selectedPowerSupply && Object.keys(this.selectedPowerSupply).length > 0) {
      //this.buildPrice+=Number.parseFloat(this.selectedPowerSupply.basic?.regular_price||"");
      lineItems.push({
        name: this.selectedPowerSupply.basic?.name || "",
        product_id: this.selectedPowerSupply.basic?.id || 0,
        quantity: 1
      });
    }


    //order
    let formData: Order = {};
    // formData = {
    //   set_paid: false,
    //   //payment_method: this.paymentGateway[0].id,
    //   //payment_method_title: this.paymentGateway[0].method_title,

    //   customer_id: 0,
    //   billing: {
    //     address_1: "Kanjirampara",
    //     address_2: "Addrwsss line 2",
    //     city: "Trivandrium",
    //     state: "KL",
    //     country: 'IN',
    //     postcode: "695030",
    //     first_name: "Rahul ",
    //     last_name: "CP",
    //     email: "rahulcpp01@gmail.com",
    //     phone: "9747968569",
    //   },
    //   shipping: {
    //     address_1: "Kanjirampara",
    //     address_2: "Addrwsss line 2",
    //     city: "Trivandrium",
    //     state: "KL",
    //     country: 'IN',
    //     postcode: "695030",
    //     first_name: "Rahul ",
    //     last_name: "CP"
    //   },
    //   //line_items: 
    //   line_items: lineItems,

    // };

    formData = {
      set_paid: false,
      //payment_method: this.paymentGateway[0].id,
      //payment_method_title: this.paymentGateway[0].method_title,

      //customer_id:0,
      billing: {
          address_1: this.userdetails.billing?.address_1||"",
          address_2: this.userdetails.billing?.address_2||"",
          city: this.userdetails.billing?.city||"",
          state: this.userdetails.billing?.state||"",
          country: 'IN',
          postcode: this.userdetails.billing?.postcode||"",
          first_name: this.userdetails?.first_name||"",
          last_name: this.userdetails?.last_name||"",
          email: this.userdetails?.email||"",
          phone: this.userdetails?.billing?.phone||""
      },
      shipping: {
          address_1: this.userdetails?.shipping?.address_1||"",
          address_2: this.userdetails?.shipping?.address_2||"",
          city: this.userdetails?.shipping?.city||"",
          state: this.userdetails?.shipping?.state||"",
          country: 'IN',
          postcode: this.userdetails?.shipping?.postcode||"",
          first_name: this.userdetails?.first_name||"",
          last_name: this.userdetails?.last_name||""
      },
      //line_items: 
      line_items: lineItems,

  };
//   this.userService.getUserInfo().then((data: any) => {
//     if (data) { //user available      
//         const savedUser = this.encryptDecryptService.decryptData(data);
//         formData.customer_id = savedUser.id;
//         this.cartService.createOrder(formData).then(() => {
//           alert("Order Placed Successfully");
//       });
//     } else {  // user not available 
//         formData.customer_id = 0;
//         this.cartService.createOrder(formData).then(() => {
//           alert("Order Placed Successfully");
//       });
//     }
// });

      formData.customer_id = 0;
        this.cartService.createOrder(formData).then(() => {
          alert("Order Placed Successfully");
      });
  
  }
}
