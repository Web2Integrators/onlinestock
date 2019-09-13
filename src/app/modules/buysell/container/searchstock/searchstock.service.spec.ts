import {
  TestBed,
  inject
} from '@angular/core/testing';
import { SearchstockService } from './searchstock.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

const mockData = [
  {
    id: 1,
    name: 'Apple',
    postId: 1,
    price: 100
  },
  {
    id: 2,
    name: 'Google',
    postId: 2,
    price: 200
  }
];

const mockOrderData = [
  {
    email: 'tom@gmail.com',
    stockid: 1,
    name: 'Google',
    quantity: 9,
    price: 100,
    value: 900,
    id: 1
  },
  {
    email: 'mahes@hgf.com',
    stockid: 1,
    name: 'Apple',
    quantity: 10,
    price: 100,
    value: 1000,
    id: 2
  }
];

const mockpostData = {
  email: 'bpatel@gmail.com',
  stockid: '1',
  name: 'Apple',
  quantity: '10',
  price: '100',
  value: '1000',
  id: '1'
};

const mockputAccount = {
  amount: '244632',
  id: '1'
};

const mockpatchData = {
  email: 'bpatel@gmail.com',
  stockid: '1',
  name: 'Apple',
  quantity: '10',
  price: '100',
  value: '1000',
  id: '1'
};

describe('SearchstockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchstockService]
    });
  });

  it('testing http get for display stocks', inject(
    [HttpTestingController, SearchstockService],
    (
      httpMock: HttpTestingController,
      SearchstockService: SearchstockService
    ) => {
      SearchstockService.getDisplayStocks().subscribe(mockData => {
        expect(Object.keys(mockData).length).toBe(2);
      });
      const req = httpMock.expectOne('http://localhost:3000/stocks');
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    }
  ));

  it('testing http get for getStocks ', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, myService: SearchstockService) => {
      myService.getStocks('Apple').subscribe(mockData => {
        console.log(mockData);
        expect(mockData[0].name).toBe('Apple');
      });
      const req = httpMock.expectOne('http://localhost:3000/stocks?name=Apple');
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    }
  ));

  it('testing http post for buy stocks', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, myService: SearchstockService) => {
      myService
        .buyStocks('bpatel@gmail.com', '1', 'Apple', '10', '100', '1000', '1')
        .subscribe(mockpostData => {
          expect(mockpostData[0].id).toBe('1');
        });
      const req = httpMock.expectOne('http://localhost:3000/orders/1');
      expect(req.request.method).toEqual('PUT');
      req.flush(mockpostData);
    }
  ));

  it('testing http post for buy stocks first time', inject(
    [HttpTestingController, SearchstockService],
    (
      httpMock: HttpTestingController,
      SearchstockService: SearchstockService
    ) => {
      SearchstockService.buyStocksFirstTime(
        'bpatel@gmail.com',
        '1',
        'Apple',
        '10',
        '100',
        '1000'
      ).subscribe(mockpostData => {
        expect(mockpostData[0].Email).toBe('bpatel@gmail.com');
      });
      const req = httpMock.expectOne('http://localhost:3000/orders');
      expect(req.request.method).toEqual('POST');
      req.flush(mockpostData);
    }
  ));

  it('testing for Update Account', inject(
    [HttpTestingController, SearchstockService],
    (
      httpMock: HttpTestingController,
      SearchstockService: SearchstockService
    ) => {
      SearchstockService.updateAccount(244632, 1).subscribe(mockputAccount => {
        expect(mockputAccount[0].id).toBe('1');
      });
      const req = httpMock.expectOne('http://localhost:3000/users/1');
      expect(req.request.method).toEqual('PATCH');
      req.flush(mockputAccount);
    }
  ));

  it('should test Sell stocks', inject(
    [HttpTestingController, SearchstockService],
    (
      httpMock: HttpTestingController,
      SearchstockService: SearchstockService
    ) => {
      SearchstockService.sellStocks(
        'bpatel@gmail.com',
        '1',
        'Apple',
        '10',
        '100',
        '1000',
        1
      ).subscribe(mockpatchData => {
        expect(mockpatchData[0].id).toBe('1');
      });
      const req = httpMock.expectOne('http://localhost:3000/orders/1');
      expect(req.request.method).toEqual('PATCH');
      req.flush(mockpatchData);
    }
  ));
});

describe('SearchstockService getProduct test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchstockService]
    });
  });

  it('service should be created', () => {
    const service: SearchstockService = TestBed.get(SearchstockService);
    expect(service).toBeTruthy();
  });

  it('testing http get for getDisplayStocks', inject(
    [HttpTestingController, SearchstockService],
    (
      httpMock: HttpTestingController,
      myService: SearchstockService
    ) => {
      myService.getDisplayStocks().subscribe(mockData => {
        expect(Object.keys(mockData).length).toBe(2);
      });
      const req = httpMock.expectOne('http://localhost:3000/stocks');
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    }
  ));

  it('testing http get for getProduct', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, myService: SearchstockService) => {
      // tslint:disable-next-line: no-shadowed-variable
      myService.getProduct('Google').subscribe(mockData => {
        expect(Object.keys(mockData).length).toBe(2);
      });
      const req = httpMock.expectOne(
        'http://localhost:3000/stocks?name=Google'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    }
  ));
  it('testing mock data to match field name', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, myService: SearchstockService) => {
      // tslint:disable-next-line: no-shadowed-variable
      myService.getProduct('Google').subscribe(data => {
        console.log(data);
        expect(data).toEqual(mockData);
      });
      const req = httpMock.expectOne(
        'http://localhost:3000/stocks?name=Google'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    }
  ));
});

describe('SearchstockService getorder test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchstockService]
    });
  });
  it('testing http get for GetOrders', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, myService: SearchstockService) => {
      // tslint:disable-next-line: no-shadowed-variable
      myService.getOrders('Google', 'tom@gmail.com').subscribe(mockOrderData => {
        expect(Object.keys(mockOrderData).length).toBe(2);
      });
      const req = httpMock.expectOne(
        'http://localhost:3000/orders?name=Google&email=tom@gmail.com'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockOrderData);
    }
  ));
  it('testing mock data to match field name', inject(
    [HttpTestingController, SearchstockService],
    (httpMock: HttpTestingController, myService: SearchstockService) => {
      // tslint:disable-next-line: no-shadowed-variable
      myService.getOrders('Google', 'tom@gmail.com').subscribe(mockOrderData => {
        expect(mockOrderData).toEqual(mockOrderData);
      });
      const req = httpMock.expectOne(
        'http://localhost:3000/orders?name=Google&email=tom@gmail.com'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockOrderData);
    }
  ));
});
