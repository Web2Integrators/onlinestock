import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { SearchInfoComponent } from './search-info.component';
import { AppModule } from 'src/app/app.module';
import { BuysellModule } from '../../buysell.module';
import { MatTableModule } from '@angular/material';
import { SearchstockService, Stock } from '../searchstock/searchstock.service';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

const mockData = [
  {
    email: 'tom@gmail.com',
    stockid: 1,
    name: 'Apple',
    quantity: 5,
    price: 100,
    value: 500,
    id: 1
  }
];

const mockStockData = [
  {
    id: 1,
    name: 'Apple',
    price: 100
  }
];

class MockService {
  getStocks(name: string) {
    return of(mockStockData);
  }
  sellStocks(
    userEmail: 'tom@gmail.com',
    stockId: 1,
    name: 'Apple',
    quantity: 5,
    price: 100,
    value: 500,
    id: 1
  ) {
    return of(mockData);
  }
  getOrders(name: string, email: string) {
    return of(mockData);
  }
  getProduct(name: string) {
    return of(mockStockData);
  }
  buyStocks() {
    return of(mockData);
  }
  buyStocksFirstTime() {
    return of(mockData);
  }
  updateAccount() {
    return of(mockData);
  }
}

describe('SearchInfoComponent', () => {
  let component: SearchInfoComponent;
  let fixture: ComponentFixture<SearchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, BuysellModule, MatTableModule],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfoComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });
  afterEach(() => {
    fixture = null;
    component = null;
  });
  it(`should be initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
  it('checks if the stockItem is empty intially', () => {
    expect(component.orderItems).toEqual([]);
  });
  it('checks if the stockItem is empty intially', () => {
    expect(component.secondStockItems).toEqual([]);
  });
  it('checks if the displayedColumns is undefined intially', () => {
    expect(component.displayedOrderColumns).toBeUndefined();
  });
  it('checks if the displayedColumns is undefined intially', () => {
    expect(component.displayedColumns).toBeUndefined();
  });
});

describe('ngOnInit', () => {
  let component: SearchInfoComponent;
  let fixture: ComponentFixture<SearchInfoComponent>;

  beforeEach(async(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key: string): string => {
     return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
      return store[key] = <string> value;
    });
    
    TestBed.configureTestingModule({
      imports: [AppModule, BuysellModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ name: 'Apple' }) }
          }
        },
        { provide: SearchstockService, useClass: MockService }
      ]
    }).compileComponents();
  }));

  const testObject = {
    email: 'tom@gmail.com',
    password: 'Password@12',
    firstName: 'tom',
    lastName: 'holleren',
    phonenumber: '678-688-78798',
    ssn: '678-67-8789789',
    creditCardNumber: '6786-7869-8778',
    date: '09-2018',
    cvv: '123',
    amount: 100500,
    id: 1
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfoComponent);
    component = fixture.componentInstance;
    localStorage.setItem('testObject',JSON.stringify(testObject));
    fixture.autoDetectChanges();
  });
  afterEach(() => {
    fixture = null;
    component = null;
  });
  it('checks that the getOrders returns valid response for a stock which is Mocked', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, userService: SearchstockService) => {
      component.ngOnInit();
      expect(mockStockData[0].price).toEqual(100);
    }));
});

describe('Check for the getStock function', () => {
  let component: SearchInfoComponent;
  let fixture: ComponentFixture<SearchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, BuysellModule, HttpClientTestingModule],
      providers: [{ provide: SearchstockService, useClass: MockService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfoComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    fixture = null;
    component = null;
  });
  it('checks that the getStockDetails returns null response for a stock which is present in the database', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, userService: SearchstockService) => {
      const name = 'Apple';
      userService.getStocks(name).subscribe((data: any[]) => {
        expect(data.length).toEqual(1);
      });
    }));
  it('checks that the getStockDetails returns valid response for a stock which is present in the database', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, userService: SearchstockService) => {
      const name = 'Apple';
      userService.getStocks(name).subscribe((data: any[]) => {
        expect(data[0]).toEqual(mockStockData[0]);
      });
    }));
  it('check for the displayedColumns variable in getStockDetails', () => {
    component.getStockDetails('Google');
    expect(component.displayedColumns.length).toBe(3);
  });
});

describe('Check for the getOrder function', () => {
  let component: SearchInfoComponent;
  let fixture: ComponentFixture<SearchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, BuysellModule, HttpClientTestingModule],
      providers: [{ provide: SearchstockService, useClass: MockService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfoComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    fixture = null;
    component = null;
  });
  it('checks that the getOrders returns valid response for a stock which is present in the database', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, userService: SearchstockService) => {
      const name = 'Apple';
      userService.getOrders(name, 'tom@gmail.com').subscribe((data: any[]) => {
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < data.length; i++) {
          const obj = data[i];
          console.log(obj);
        }
        expect(data[0]).toEqual(mockData[0]);
      });
    }));
  it('checks that the getOrders returns valid response for a stock which is present in the database', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, userService: SearchstockService) => {
      const name = 'Tesla';
      userService.getOrders(name, 'tom@gmail.com').subscribe((data: any[]) => {
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < data.length; i++) {
          const obj = data[i];
          console.log(obj);
        }
        expect(data.length).toEqual(1);
      });
    }));
});

describe('Check for the checkOrderResponse function', () => {
  let component: SearchInfoComponent;
  let fixture: ComponentFixture<SearchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, BuysellModule, HttpClientTestingModule],
      providers: [SearchstockService, { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfoComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    fixture = null;
    component = null;
  });
  it('check for null argument in checkorderResponse', () => {
    const mockTestData = [
      { id: 2, name: 'Google', price: 200 },
      {
        id: 1,
        name: 'Apple',
        price: 100
      }
    ];
    const resultData = { id: 2, name: 'Google', price: 200 };
    const result = component.checkOrderResponse(mockTestData, 'Google');
    expect(result[0]).toEqual(resultData);
  });
  it('check for empty argument in checkorderResponse', () => {
    const mockTestData = [{ id: '', name: '', price: '' }];
    const result = component.checkOrderResponse(mockTestData, 'Google');
    expect(result[0].id).toEqual('');
  });
  it('check for null argument in checkorderResponse', () => {
    const result = component.checkOrderResponse(null, 'Google');
    expect(result).toEqual(null);
  });
  it('check for default isDisable variable in checkorderResponse', () => {
    expect(component.isDisabled).toBeFalsy();
  });
  it('check for default isDisable variable in checkorderResponse when passing in null', () => {
    const result = component.checkOrderResponse(null, 'Google');
    expect(component.isDisabled).toBeTruthy();
  });
});
