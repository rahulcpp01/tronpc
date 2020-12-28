import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit,Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  darkmode: boolean= false;
  constructor(@Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2) { }

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
}
