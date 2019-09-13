import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
  FormControl,
  NgForm
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, concatMap } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { SearchstockService, Stock } from '../searchstock/searchstock.service';
import { forkJoin } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.scss']
})
export class BuyStockComponent implements OnInit {
  buyForm: FormGroup;
  disabled: any;
  animal: any;
  type: string;
  hide: boolean;
  values: any;
  presentUrl: any;
  errorMessage: string;
  stockId: number;
  name: any;
  price: any;
  param: string;
  emailId: unknown;
  accountValue: any;
  id: unknown;
  orderid: any;
  bdisable: boolean;
  stocksQuantity: number;
  buy: boolean;
  quantitys: number;

  // logic for checking the url link whether it's a buy or sell along with declartaions of services instances
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private updateaccount: SearchstockService,
    private router: Router,
    private StockAdd: SearchstockService,
    private Stocksell: SearchstockService,
    private order: SearchstockService,
    private route: ActivatedRoute
  ) {
    router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        this.param = this.route.snapshot.paramMap.get('name');
        console.log(event.url);
        this.presentUrl = event.url;
        if (event.url == `/dashboard/buysell/home/${this.param}/info/buy`) {
          this.hide = true;
        } else if (
          event.url == `/dashboard/buysell/home/${this.param}/info/sell`
        ) {
          this.hide = false;
        }
      });
  }
  // To validate the input field and to even check if total price is less than remaining balance when buying and checking input less or equal  than amount of stocks they have when selling a particular stocks
  onKey(event: any) {
    // without type info
    this.values = +event.target.value;
    if (this.presentUrl == `/dashboard/buysell/home/${this.param}/info/buy`) {
      if (this.values * this.price > this.accountValue) {
        this.errorMessage = 'Value more than remaining Balance';
        this.bdisable = false;
      } else if (!Number.isInteger(this.values)) {
        this.errorMessage = 'Quantity should be an integer';
        this.bdisable = false;
      } else if (this.values === Number.NaN) {
        this.errorMessage = 'Quantity should be an integer';
        this.bdisable = false;
      } else {
        this.bdisable = true;
      }
    } else if (
      this.presentUrl === `/dashboard/buysell/home/${this.param}/info/sell`
    ) {
      if (this.values > this.stocksQuantity) {
        this.errorMessage = 'Quantity more than remaining Stocks';
        this.bdisable = false;
      } else if (!Number.isInteger(this.values)) {
        this.errorMessage = 'Quantity should be an integer';
        this.bdisable = false;
      } else if (this.values === Number.NaN) {
        this.errorMessage = 'Quantity should be an integer';
        this.bdisable = false;
      } else {
        this.bdisable = true;
      }
    }
  }

  // to open dialog once user clicks on buy
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { name: this.type, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // checking whether user wants to buy or cancel the order
      if (result === 'true') {
        let stockAdd$;
        if (this.buy === true) {
          stockAdd$ = this.StockAdd.buyStocks(
            this.emailId,
            this.stockId,
            this.param,
            this.stocksQuantity + this.buyForm.controls['quantity'].value,
            this.price,
            (this.stocksQuantity + this.buyForm.controls['quantity'].value) *
              this.price,
            this.orderid
          );
        } else {
          // code for buying a particular stock for the first time for the user
          stockAdd$ = this.StockAdd.buyStocksFirstTime(
            this.emailId,
            this.stockId,
            this.param,
            this.buyForm.controls['quantity'].value,
            this.price,
            this.buyForm.controls['quantity'].value * this.price
          );
        }
        // For updating Acoount value on buying stocks
        const updateAccount$ = this.updateaccount.updateAccount(
          this.accountValue -
            this.buyForm.controls['quantity'].value * this.price,
          this.id
        );
        stockAdd$.pipe(concatMap(result1 => updateAccount$)).subscribe(data => {
          console.log(data);
          alert('Stocks Bought and updated Sucessfully !!');
          // route to portfolio
          this.router.navigateByUrl('/dashboard/buysell');
        });
      }
      console.log(result);
    });
  }
    // logic for selling the Stocks and updating account value
  sellStock(): void {
    // For updating Acoount value on selling stocks
    const updateAccount$ = this.updateaccount.updateAccount(
      this.accountValue - this.buyForm.controls['quantity'].value * this.price,
      this.id
    );
    let stockSell$;
    stockSell$ = this.Stocksell.sellStocks(
      this.emailId,
      this.stockId,
      this.param,
      this.stocksQuantity - this.buyForm.controls['quantity'].value,
      this.price,
      (this.stocksQuantity - this.buyForm.controls['quantity'].value) *
        this.price,
      this.id
    );
    stockSell$.pipe(concatMap(result1 => updateAccount$)).subscribe(data => {
      console.log(data);
      alert('Stocks Sold and updated Sucessfully !!');
      // route to portfolio
      this.router.navigateByUrl('/dashboard/buysell');
    });
  }

  // getting stock and order details of that particular stock and user
  // caching the user data for account balance updation
  // created form for buy and selling stocks using form builder

  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get('name');
    const user = JSON.parse(localStorage.getItem('testObject'));
    this.order.getOrders(this.param, user.email).subscribe(data => {
      console.log(data[0].name);
      length = data.length;
      if (length != 0) {
        this.buy = true;
        this.stocksQuantity = data[0].quantity;
        this.orderid = data[0].id;
      } else {
        this.buy = false;
      }
    });

    this.order.getStocks(this.param).subscribe(data => {
      console.log(data);
      this.price = data[0].price;
      this.stockId = data[0].id;
    });

    console.log(user, '**after**');
    Object.entries(user).forEach(([key, value]) => {
      switch (key) {
        case 'email':
          this.emailId = value;
          break;
        case 'amount':
          this.accountValue = value;
          break;
        case 'id':
          this.id = value;
          break;
      }
    });

    this.buyForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['']
    });
  }
}
