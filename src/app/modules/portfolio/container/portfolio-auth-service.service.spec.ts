import { TestBed, inject } from '@angular/core/testing';

import { PortfolioAuthServiceService } from './portfolio-auth-service.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('PortfolioAuthServiceService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers:[
      PortfolioAuthServiceService
    ]
  });
});

  it('should be created', () => {
    const service: PortfolioAuthServiceService = TestBed.get(PortfolioAuthServiceService);
    expect(service).toBeTruthy();
  });

  it('get stock details', inject([HttpTestingController,PortfolioAuthServiceService],(httpMock: HttpTestingController, portfolioPageService: PortfolioAuthServiceService)=>{
    const mockData = {
        "email": "mahes@hgf.com",
        "stockid": 1,
        "name": "Apple",
        "quantity": 10,
        "price": 100,
        "value": 1000,
        "id": 2
    };

    portfolioPageService.getStockDetails('mahes@hgf.com').subscribe(data => {
      expect((Object.keys(data).length)).toBe(7);
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne('http://localhost:3000/orders?email=mahes@hgf.com');
    expect(req.request.method).toEqual('GET');

    // Then we set the fake data to be returned by the mock
    req.flush(mockData);

  }));

  it('testing http patch', inject([HttpTestingController,PortfolioAuthServiceService],(httpMock: HttpTestingController, portfolioPageService: PortfolioAuthServiceService)=>{
    const mockData =     {
      "email": "tom@gmail.com",
      "password": "Password@12",
      "firstName": "gameeee",
      "lastName": "grace",
      "phonenumber": "678-688-78798",
      "ssn": "678-67-8789789",
      "creditCardNumber": "6786-7869-8778",
      "date": "09-2018",
      "cvv": "123",
      "amount": 100500,
      "id": 1
    };

    portfolioPageService.updateUserDetails('Password@12','gameeee','grace','678-688-78798','678-67-8789789','6786-7869-8778','09-2018','123',1).subscribe(data => {
      expect((Object.keys(data).length)).toBe(11);
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne('http://localhost:3000/users/1');
    expect(req.request.method).toEqual('PATCH');

    // Then we set the fake data to be returned by the mock
    req.flush(mockData);

  }));
});
