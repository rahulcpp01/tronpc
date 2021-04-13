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
      await this.productService.waitForSession('processors');
      this.processors = JSON.parse(sessionStorage["processors"]);
    } else if (this.route.snapshot.params["type"] == "cases") {
      await this.productService.waitForSession('cases');
      this.cases = JSON.parse(sessionStorage["cases"]);
    } else if (this.route.snapshot.params["type"] == "coolers") {
      await this.productService.waitForSession('coolers');
      this.coolers = JSON.parse(sessionStorage["coolers"]);
    } else if (this.route.snapshot.params["type"] == "gpu") {
      await this.productService.waitForSession('gpu');
      this.gpus = JSON.parse(sessionStorage["gpu"]);
    } else if (this.route.snapshot.params["type"] == "hdds") {
      await this.productService.waitForSession('hdds');
      this.hdds = JSON.parse(sessionStorage["hdds"]);
    } else if (this.route.snapshot.params["type"] == "m2s") {
      await this.productService.waitForSession('m2s');
      this.m2s = JSON.parse(sessionStorage["m2s"]);
    } else if (this.route.snapshot.params["type"] == "motherboards") {
      await this.productService.waitForSession('motherboards');
      this.motherboards = JSON.parse(sessionStorage["motherboards"]);

    } else if (this.route.snapshot.params["type"] == "powersupplies") {
      await this.productService.waitForSession('powersupplies');
      this.powersupplys = JSON.parse(sessionStorage["powersupplies"]);

    } else if (this.route.snapshot.params["type"] == "rams") {
      await this.productService.waitForSession('rams');
      this.rams = JSON.parse(sessionStorage["rams"]);
    } else if (this.route.snapshot.params["type"] == "ssds") {
      await this.productService.waitForSession('ssds');
      this.ssds = JSON.parse(sessionStorage["ssds"]);
    }


  }


  addToCart(product: TronPCProduct) {    
    this.cartService.addToCart(product);    
}

}
