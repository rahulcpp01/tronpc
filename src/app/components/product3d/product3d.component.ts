import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'product3d',
  templateUrl: './product3d.component.html',
  styleUrls: ['./product3d.component.scss']
})
export class Product3dComponent implements OnInit {
  @ViewChild("card") card!: ElementRef;
  @ViewChild("circle") circle!: ElementRef;
  @ViewChild("title") title!: ElementRef;
  @ViewChild("productimage") productimage!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("price") price!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  containerMouseMove(e:any){
    
    let xAxis = (window.innerWidth / 2 - e.clientX) / 50;
    let yAxis = (window.innerHeight / 2 - e.clientY) / 50;
    this.card.nativeElement.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    this.circle.nativeElement.style.transition = "all 0.5s ease";
  }

  containerMouseEnter(e:any){
    this.card.nativeElement.style.transition = "none";
    this.card.nativeElement.style.transform = `rotateY(0deg) rotateX(0deg)`;

    this.title.nativeElement.style.transform = "translateZ(150px)";
    this.productimage.nativeElement.style.transform = "translateZ(150px)";
    this.description.nativeElement.style.transform = "translateZ(125px)";
    this.price.nativeElement.style.transform = "translateZ(100px)";
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
