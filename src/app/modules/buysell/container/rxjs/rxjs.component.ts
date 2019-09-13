import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { SearchstockService } from '../searchstock/searchstock.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {
  errorMessage: any
  stocks$: Observable<any> = this.StockList.stocks$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  constructor(private StockList: SearchstockService) { }

  ngOnInit() {
  }

}
