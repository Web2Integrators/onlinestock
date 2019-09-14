import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuysellRoutingModule } from './buysell-routing.module';
import { SearchstockComponent } from './container/searchstock/searchstock.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BuyStockComponent } from './container/buy-stock/buy-stock.component';
import { ModalComponent } from './container/buy-stock/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import { SearchInfoComponent } from './container/search-info/search-info.component';


@NgModule({
  declarations: [SearchstockComponent,SearchInfoComponent, BuyStockComponent, ModalComponent],
  imports: [
    CommonModule,
    BuysellRoutingModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class BuysellModule {}
