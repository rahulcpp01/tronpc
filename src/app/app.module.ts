import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from 'src/services/inteceptors/app.interceptor';
import { WoocommerceService } from 'src/services/woocommerce.service';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { BuildComponent } from './components/build/build.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';
import { DescriptionComponent } from './components/description/description.component';

import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Product3dComponent } from './components/product3d/product3d.component';
import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
const INTERCEPTORS: {}[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomeComponent,
    AboutComponent,
    InventoryComponent,
    BuildComponent,
    PageNotFoundComponent,
    ProductComponent,
    DescriptionComponent,
    Product3dComponent,
    CartComponent,
    CartProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjOBUeVzRsg2WIcCgD06Tye4sz8WC9S0A'
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    INTERCEPTORS,
    WoocommerceService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
