import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TronPCProduct } from 'src/models/cartModel';
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
import { CartService } from 'src/services/cart.service';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

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

  constructor(private productService: WoocommerceService,
              private router: Router,
              private cartService: CartService) {    
  }
  async ngOnInit() {

    // forkJoin([
    //   this.productService.getAllProcessors(),
    //   this.productService.getAllCases(),
    //   this.productService.getAllCoolers(),
    //   this.productService.getAllGPUs(),
    //   this.productService.getAllHDDs(),
    //   this.productService.getAllM2s(),
    //   this.productService.getAllMotherBoards(),
    //   this.productService.getAllPowerSupplies(),
    //   this.productService.getAllRAMs(),
    //   this.productService.getAllSSDs()
    // ]).subscribe(products =>{
    //   //console.log(product);
    //   this.processors = this.productService.processorsFactory(products[0]);
    //   this.cases =  this.productService.casesFactory(products[1]);
    //   this.coolers = this.productService.coolersFactory(products[2]);
    //   this.gpu = this.productService.gpusFactory(products[3]);
    //   this.hdd = this.productService.hddsFactory(products[4]);
    //   this.m2 = this.productService.M2sFactory(products[5]);
    //   this.motherboard = this.productService.motherBoardsFactory(products[6]);
    //   this.powersupply = this.productService.PowerSuppliesFactory(products[7]);
    //   this.ram = this.productService.RAMsFactory(products[8]);
    //   this.ssd = this.productService.SSDsFactory(products[9]);
    // })

    // this.productService.getAllProcessors().subscribe(product => {
    //   this.processors = this.productService.processorsFactory(product);       
    // });
    // this.productService.getAllCases().subscribe(product =>{
    //   this.cases =  this.productService.casesFactory(product);
    // })
    // this.productService.getAllCoolers().subscribe(product => {
    //   this.coolers = this.productService.coolersFactory(product);
    // })
    // this.productService.getAllGPUs().subscribe(product => {
    //   this.gpu = this.productService.gpusFactory(product);
    // })

    // this.productService.getAllHDDs().subscribe(product => {
    //   this.hdd = this.productService.hddsFactory(product);
    // })

    // this.productService.getAllM2s().subscribe(product => {
    //   this.m2 = this.productService.M2sFactory(product);
    // })

    // this.productService.getAllMotherBoards().subscribe(product => {
    //   this.motherboard = this.productService.motherBoardsFactory(product);
    // })

    // this.productService.getAllPowerSupplies().subscribe(product => {
    //   this.powersupply = this.productService.PowerSuppliesFactory(product);
    // })

    // this.productService.getAllRAMs().subscribe(product => {
    //   this.ram = this.productService.RAMsFactory(product);
    // })

    // this.productService.getAllSSDs().subscribe(product => {
    //   this.ssd = this.productService.SSDsFactory(product);
    // })
    // if(!sessionStorage["processors"])
    // this.productService.getAllProcessors().subscribe(product => {
    //   this.processors = this.productService.processorsFactory(product);

    //   this.productService.getAllCases().subscribe(product => {
    //     this.cases = this.productService.casesFactory(product);

    //     this.productService.getAllCoolers().subscribe(product => {
    //       this.coolers = this.productService.coolersFactory(product);

    //       this.productService.getAllGPUs().subscribe(product => {
    //         this.gpus = this.productService.gpusFactory(product);

    //         this.productService.getAllHDDs().subscribe(product => {
    //           this.hdds = this.productService.hddsFactory(product);

    //           this.productService.getAllM2s().subscribe(product => {
    //             this.m2s = this.productService.M2sFactory(product);

    //             this.productService.getAllMotherBoards().subscribe(product => {
    //               this.motherboards = this.productService.motherBoardsFactory(product);

    //               this.productService.getAllPowerSupplies().subscribe(product => {
    //                 this.powersupplys = this.productService.PowerSuppliesFactory(product);
    //                 this.productService.getAllRAMs().subscribe(product => {
    //                   this.rams = this.productService.RAMsFactory(product);

    //                   this.productService.getAllSSDs().subscribe(product => {
    //                     this.ssds = this.productService.SSDsFactory(product);
    //                   })
    //                 })

    //               })
    //             })
                
    //           })

    //         })
    //       })
    //     })
    //   })
    // });
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
  
  addToCart(product: TronPCProduct) {    
      this.cartService.addToCart(product);    
  }
}
