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
import { ProcessorBlockComponent } from './components/processor-block/processor-block.component';
import { ProcessorComponent } from './components/processor/processor.component';

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
    ProcessorBlockComponent,
    ProcessorComponent
  ],
  imports: [
    BrowserModule,
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
