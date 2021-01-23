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

import { AgmCoreModule } from '@agm/core';
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
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjOBUeVzRsg2WIcCgD06Tye4sz8WC9S0A'
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    INTERCEPTORS,
    WoocommerceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
