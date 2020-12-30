import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BuildComponent } from './components/build/build.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProcessorComponent } from './components/processor/processor.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'build', component: BuildComponent},
  { path: 'processor/:id', component: ProcessorComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component:PageNotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
