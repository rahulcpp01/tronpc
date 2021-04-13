import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartModel, TronPCProduct } from 'src/models/cartModel';
import { CartService } from 'src/services/cart.service';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tronpc';
  cartcount: number = 0;
  public popup: boolean = false;
  public cart!: CartModel;
  public total: number=0;
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

  constructor(private productService: WoocommerceService,
    private cartService: CartService) {
        
  }
  ngOnInit(): void {

    this.cartService.cartData.pipe(map(data => {
      let totalproductcount = 0;
      if (data) {
        data.productData.forEach(products => {
          totalproductcount += products.in_cart ? products.in_cart: 0;
        });
      }
      console.log("Total Product"+ totalproductcount);
      return totalproductcount;
    })
    ).subscribe(count => {
      console.log("Subscribe Count"+ count);
      this.cartcount = count;
    });
    this.cartService.cartData.subscribe(data => {
      this.cart = data;
    });
    this.cartService.cartTotal.subscribe(total => this.total = total);


    //this.productService.LoadFeaturedProducts();
    // this.productService.getAllProcessors().subscribe(product => {
    //   this.productService.processorsFactory(product);

    //   this.productService.getAllCases().subscribe(product => {
    //     this.productService.casesFactory(product);

    //     this.productService.getAllCoolers().subscribe(product => {
    //       this.productService.coolersFactory(product);

    //       this.productService.getAllGPUs().subscribe(product => {
    //         this.productService.gpusFactory(product);

    //         this.productService.getAllHDDs().subscribe(product => {
    //           this.productService.hddsFactory(product);

    //           this.productService.getAllM2s().subscribe(product => {
    //             this.productService.M2sFactory(product);

    //             this.productService.getAllMotherBoards().subscribe(product => {
    //               this.productService.motherBoardsFactory(product);

    //               this.productService.getAllPowerSupplies().subscribe(product => {
    //                 this.productService.PowerSuppliesFactory(product);

    //                 this.productService.getAllRAMs().subscribe(product => {
    //                   this.productService.RAMsFactory(product);

    //                   this.productService.getAllSSDs().subscribe(product => {
    //                     this.productService.SSDsFactory(product);
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
  }

  addToCart(product: TronPCProduct) {
    this.cartService.addToCart(product);  
  }
 
}
