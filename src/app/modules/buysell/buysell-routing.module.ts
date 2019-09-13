import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchstockComponent } from './container/searchstock/searchstock.component';
import { BuyStockComponent } from './container/buy-stock/buy-stock.component';
import { SearchInfoComponent } from './container/search-info/search-info.component';
import { RxjsComponent } from './container/rxjs/rxjs.component';




const routes: Routes = [
  {
    path: '', component: SearchstockComponent
  },
  {
    path:'rxjs' ,component :RxjsComponent
  },
  {
    path: 'home/:name/info', component: SearchInfoComponent
  },
  {
    path: 'home/:name/info/buy', component: BuyStockComponent
  },
  {
    path: 'home/:name/info/sell', component: BuyStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuysellRoutingModule { }
