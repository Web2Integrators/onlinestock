import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, count, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchstockService {
  static findOne(arg0: string): any {
    throw new Error("Method not implemented.");
  }
  static all(): any {
    throw new Error("Method not implemented.");
  }

  private stocksUrl ='http://localhost:3000/stocks';
  private ordersUrl ='http://localhost:3000/orders';
  name: any;
  id: any;
  stockName: string;
  userEmail: string;

  // Tried mocking data for getting stock list
  StockList: Array<object> = [ 
    {
      id: 1,
      name: 'Appple',
      price: 2508,
    },
    {
      id: 2,
      name: 'Amazon',
      price:1907,
    }
  ];

  /**
   * Parameterized constructor to fetch the backend data
   * @param StockService The HttpClient to test the backend database
   * @param http used for adding stocks
   */
    constructor(private StockService: HttpClient, private http: HttpClient) {}

// Trying to select all stocks by mocking 
    all(): Observable<Array<object>> {
      return of(this.StockList);
    }
    findOne(id: string): Observable<object> {
      const stock = this.StockList.find((s: any) => {
        return s.id === id;
      });
      return of(stock);
    }

  /**
   * This function returns the data from the fake json
   * server. It uses the stocksUrl and makes a get Request
   * to get the data which is then used to render on the view
   */
  getProduct(name: string): Observable<Stock[]> {
    this.stockName = name;
    return this.StockService.get<Stock[]>(`http://localhost:3000/stocks?name=${this.stockName}`).pipe(
      tap(data => console.log('getProduct: ' + JSON.stringify(data)))
    );
  }

 /**
  * This function returns the data from the fake json
  * server. It uses the stocksUrl and makes a get Request
  * to get the data which is then used to render on the view
  * @param name cannot be null
  */
   getOrders(name: string, email: string): Observable<Orders[]> {
     this.stockName = name;
     this.userEmail = email;
     return this.StockService.get<Orders[]>(`http://localhost:3000/orders?name=${this.stockName}&email=${this.userEmail}`).pipe(
       tap(data => console.log('getOrders: ' + JSON.stringify(data)))
     );
   }

  /**
   * This function returns the data from the fake json
   * server. It uses the stocksUrl and makes a get Request
   * to get the data which is then used to render on the view
   */
  public getDisplayStocks(): Observable<Stock[]> {
    return this.StockService.get<Stock[]>
      (this.stocksUrl);
  }

  public getStocks(name): Observable<Stock[]> {
    this.stockName = name.replace(/"/g, '&quot;');
    return this.StockService.get<Stock[]>
      (`http://localhost:3000/stocks?name=${this.stockName}`);
  }

  public buyStocks(userEmail, stockId, name, quantity, price, value,id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.id = id
    const postData = {
      email: userEmail,
      stockid: stockId,
      name: name,
      quantity: quantity,
      price: price,
      value: value,
    };
    return this.http.put(`http://localhost:3000/orders/${this.id}`, postData)
  }

  public buyStocksFirstTime(userEmail, stockId, name, quantity, price, value) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const postData = {
      email: userEmail,
      stockid: stockId,
      name: name,
      quantity: quantity,
      price: price,
      value: value,
    };
    return this.http.post(`http://localhost:3000/orders`, postData)
  }

  public updateAccount(accountValue,id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.id = id;
    const putAccount = {
      amount : accountValue,
    };
    return this.http.patch(`http://localhost:3000/users/${this.id}`, putAccount)
  }

  public sellStocks(userEmail, stockId, name, quantity, price, value,id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.id = id;
    const patchData = {
      email: userEmail,
      stockid: stockId,
      name: name,
      quantity: quantity,
      price: price,
      value: value,
    };
    return this.http.patch(`http://localhost:3000/orders/${this.id}`, patchData,httpOptions)
  }
}

export class Stock {
  id: number;
  name: string;
  price: any;
}

export class Orders {
  email: string;
  stockid: number;
  name: string;
  quantity: number;
  price: number;
  value: number;
  id: any;
}


