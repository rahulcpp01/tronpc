import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BuildComponent } from './components/build/build.component';
import { DescriptionComponent } from './components/description/description.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'build', component: BuildComponent},
  { path: 'description/:type/:id', component: DescriptionComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component:PageNotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
