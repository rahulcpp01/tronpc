import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit,Renderer2, ViewChild } from '@angular/core';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  darkmode: boolean= false;
  constructor(@Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2,
  private productService: WoocommerceService,
  private _location: Location) { }

  ngOnInit(): void {
    // debugger;
    // if(sessionStorage['dark-mode']){
    //   console.log("darkmaode available");
    //   this.darkmode = sessionStorage['dark-mode'];
    // }else{
    //   this.darkmode = false;
    //   sessionStorage['dark-mode']=false;
    // }
  }

  toggleDarkmode(){
    this.darkmode = !this.darkmode;
    if(this.darkmode){
      this.renderer.addClass(this.document.body, 'dark-mode');
    }else{
      this.renderer.removeClass(this.document.body, 'dark-mode');
    }
    
  }

  search(val: string){
    this.productService.searchProducts(val).subscribe(x=>{
      console.clear();
      console.log(x);
    })
  }
}
