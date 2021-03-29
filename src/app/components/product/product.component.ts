import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Processor } from 'src/models/custommodels/processor.model';
import { Product } from 'src/models/product/product';
import { ProductImage } from 'src/models/product/product.image';
import { WoocommerceService } from 'src/services/woocommerce.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public image: string = "";
  public regularprice: number= 0;
  public productAvailable: boolean = false;
  public product_name: string = "";

  @Input() id : number= 0;
  @Input() type : string =  "";
  @Input() product!: Product;
  @Input() prdctdescription! : string;

  @ViewChild("card") card!: ElementRef;
  @ViewChild("circle") circle!: ElementRef;
  @ViewChild("title") title!: ElementRef;
  @ViewChild("productimage") productimage!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("price") price!: ElementRef;
  constructor(private productService: WoocommerceService) { }
   
  ngOnInit() {
    // console.log("id"+ this.id);
    let product= this.product? this.product:this.productService.getProductFromSession(this.id,this.type);
    if(product.basic.regular_price > 0){
      this.regularprice = product.basic.regular_price; 
    }
    if(product.basic.images.length > 0){
      this.image = product.basic.images[0].src;
    }else{
      this.image = "../../../assets/images/i3.jpeg";
    }
    this.product_name = product.basic.name;
    this.productAvailable = true;
  }

  containerMouseMove(e:any){
    let xval = e.clientX;
    if(e.clientX < (window.innerWidth / 4)){
      xval += (window.innerWidth / 4);
    }else if(e.clientX > ((window.innerWidth / 4)*3)){
      xval -= (window.innerWidth / 4);
    }
    let xAxis = (window.innerWidth / 2 - xval) / 40;
    let yAxis = (window.innerHeight / 2 - e.clientY) / 40;
    this.card.nativeElement.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    this.circle.nativeElement.style.transition = "all 0.5s ease";
  }

  containerMouseEnter(e:any){
    this.card.nativeElement.style.transition = "none";
    this.card.nativeElement.style.transform = `rotateY(0deg) rotateX(0deg)`;

    this.title.nativeElement.style.transform = "translateZ(200px)";
    this.productimage.nativeElement.style.transform = "translateZ(125px)";
    this.description.nativeElement.style.transform = "translateZ(125px)";
    this.price.nativeElement.style.transform = "translateZ(150px)";
  }
  containerMouseLeave(e:any){
    this.card.nativeElement.style.transition = "all 0.5s ease";
    this.card.nativeElement.style.transform = `rotateY(0deg) rotateX(0deg)`;

    this.title.nativeElement.style.transform = "translateZ(0px)";
    this.productimage.nativeElement.style.transform = "translateZ(0px)";
    this.description.nativeElement.style.transform = "translateZ(0px)";
    this.price.nativeElement.style.transform = "translateZ(0px)";
  }

}
