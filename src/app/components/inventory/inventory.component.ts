import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Case } from 'src/models/custommodels/case.model';
import { Cooler } from 'src/models/custommodels/cooler.model';
import { GPU } from 'src/models/custommodels/gpu.model';
import { HDD } from 'src/models/custommodels/hdd.model';
import { M2 } from 'src/models/custommodels/m2.model';
import { MotherBoard } from 'src/models/custommodels/motherboard.model';
import { Processor } from 'src/models/custommodels/processor.model';
import { Product } from 'src/models/product/product';
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
  public gpu: GPU[] = [];
  public hdd: HDD[] = [];
  public m2: M2[] = [];
  public motherboard: MotherBoard[] = [];
  constructor(private productService: WoocommerceService,
    private router: Router) {    
  }
  ngOnInit(): void {

    this.productService.getAllProcessors().subscribe(product => {
      this.processors = this.productService.processorsFactory(product);       
    });
    this.productService.getAllCases().subscribe(product =>{
      this.cases =  this.productService.casesFactory(product);
    })
    this.productService.getAllCoolers().subscribe(product => {
      this.coolers = this.productService.coolersFactory(product);
    })
    this.productService.getAllGPUs().subscribe(product => {
      this.gpu = this.productService.gpusFactory(product);
    })

    this.productService.getAllHDDs().subscribe(product => {
      this.hdd = this.productService.hddsFactory(product);
    })

    this.productService.getAllM2s().subscribe(product => {
      this.m2 = this.productService.M2sFactory(product);
    })

    this.productService.getAllMotherBoards().subscribe(product => {
      this.motherboard = this.productService.motherBoardsFactory(product);
    })
  }
  
}
