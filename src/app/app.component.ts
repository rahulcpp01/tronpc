import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tronpc';
  // public processors: Processor[]=[];
  // public cases: Case[] = [];
  // public coolers: Cooler[] = [];
  // public gpus: GPU[] = [];
  // public hdds: HDD[] = [];
  // public m2s: M2[] = [];
  // public motherboards: MotherBoard[] = [];
  // public powersupplys: PowerSupply[] = [];
  // public rams: RAM[] = [];
  // public ssds: SSD[] = [];

  constructor(private productService: WoocommerceService) {
        
  }
  ngOnInit(): void {
    this.productService.getAllProcessors().subscribe(product => {
      this.productService.processorsFactory(product);

      this.productService.getAllCases().subscribe(product => {
        this.productService.casesFactory(product);

        this.productService.getAllCoolers().subscribe(product => {
          this.productService.coolersFactory(product);

          this.productService.getAllGPUs().subscribe(product => {
            this.productService.gpusFactory(product);

            this.productService.getAllHDDs().subscribe(product => {
              this.productService.hddsFactory(product);

              this.productService.getAllM2s().subscribe(product => {
                this.productService.M2sFactory(product);

                this.productService.getAllMotherBoards().subscribe(product => {
                  this.productService.motherBoardsFactory(product);

                  this.productService.getAllPowerSupplies().subscribe(product => {
                    this.productService.PowerSuppliesFactory(product);

                    this.productService.getAllRAMs().subscribe(product => {
                      this.productService.RAMsFactory(product);

                      this.productService.getAllSSDs().subscribe(product => {
                        this.productService.SSDsFactory(product);
                      })
                    })

                  })
                })
                
              })

            })
          })
        })
      })
    });
  }
 
}
