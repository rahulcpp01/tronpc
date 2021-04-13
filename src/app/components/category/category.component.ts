import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { CartService } from 'src/services/cart.service';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

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

  constructor(private productService: WoocommerceService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  async ngOnInit() {
    if (this.route.snapshot.params["type"] == "processors") {
      //await this.productService.waitForSession('processors');
      //this.processors = JSON.parse(sessionStorage["processors"]);
      this.productService.getAllProcessors().subscribe(product =>{
        this.processors = this.productService.processorsFactoryMain(product);
      });
    } else if (this.route.snapshot.params["type"] == "cases") {
      //await this.productService.waitForSession('cases');
      //this.cases = JSON.parse(sessionStorage["cases"]);
      this.productService.getAllCases().subscribe(product =>{
        this.cases = this.productService.casesFactoryMain(product);
      });
    } else if (this.route.snapshot.params["type"] == "coolers") {
      // await this.productService.waitForSession('coolers');
      // this.coolers = JSON.parse(sessionStorage["coolers"]);
      this.productService.getAllCoolers().subscribe(product =>{
        this.coolers = this.productService.coolersFactoryMain(product);
      });
    } else if (this.route.snapshot.params["type"] == "gpu") {
      // await this.productService.waitForSession('gpu');
      // this.gpus = JSON.parse(sessionStorage["gpu"]);
      this.productService.getAllGPUs().subscribe(product =>{
        this.gpus = this.productService.gpusFactoryMain(product);
      });
    } else if (this.route.snapshot.params["type"] == "hdds") {
      // await this.productService.waitForSession('hdds');
      // this.hdds = JSON.parse(sessionStorage["hdds"]);
      this.productService.getAllHDDs().subscribe(product =>{
        this.hdds = this.productService.hddsFactoryMain(product);
      });
    } else if (this.route.snapshot.params["type"] == "m2s") {
      // await this.productService.waitForSession('m2s');
      // this.m2s = JSON.parse(sessionStorage["m2s"]);
      this.productService.getAllM2s().subscribe(product =>{
        this.m2s = this.productService.M2sFactoryMain(product);
      });
    } else if (this.route.snapshot.params["type"] == "motherboards") {
      // await this.productService.waitForSession('motherboards');
      // this.motherboards = JSON.parse(sessionStorage["motherboards"]);
      this.productService.getAllMotherBoards().subscribe(product =>{
        this.motherboards = this.productService.motherBoardsFactoryMain(product);
      });

    } else if (this.route.snapshot.params["type"] == "powersupplies") {
      // await this.productService.waitForSession('powersupplies');
      // this.powersupplys = JSON.parse(sessionStorage["powersupplies"]);
      this.productService.getAllPowerSupplies().subscribe(product =>{
        this.powersupplys = this.productService.processorsFactoryMain(product);
      });

    } else if (this.route.snapshot.params["type"] == "rams") {
      // await this.productService.waitForSession('rams');
      // this.rams = JSON.parse(sessionStorage["rams"]);
      this.productService.getAllRAMs().subscribe(product =>{
        this.rams = this.productService.RAMsFactoryMain(product);
      });
    } else if (this.route.snapshot.params["type"] == "ssds") {
      // await this.productService.waitForSession('ssds');
      // this.ssds = JSON.parse(sessionStorage["ssds"]);
      this.productService.getAllSSDs().subscribe(product =>{
        this.ssds = this.productService.SSDsFactoryMain(product);
      });
    }


  }


  addToCart(product: TronPCProduct) {    
    this.cartService.addToCart(product);    
}

}
