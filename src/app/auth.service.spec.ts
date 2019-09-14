import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { from } from 'rxjs';
import { emit } from 'cluster';

describe('AuthService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
     
    providers: [AuthService],
      imports: [HttpClientTestingModule]

  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });


  it('authService in Registration for get details', 
    inject([HttpTestingController,AuthService], (service: AuthService) => {
    expect(service.getDetails()).toBeTruthy();
  }));

it('testing http get for registration details', 
    inject([HttpTestingController,AuthService],(httpMock: HttpTestingController, service: AuthService)=>{
    
      const mockData = [
      {
        "email": "kudani@virtua.com",
        "password": "Passwoerrcdf12",
        "firstName": "arg",
        "lastName": "madineni",
        "phonenumber": "5182568300",
        "ssn": "232-43-2432",
        "creditCardNumber": "4324-3543-5465-4765",
        "date": "09-2019",
        "cvv": "234334",
        "amount": 123,
        "id": 1
      },
     
    ];
    
      service.getDetails().subscribe(mockData => {
     
      expect(mockData[0].email).toBe("kudani@virtua.com");

    });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/users');
      expect(req.request.method).toEqual('POST');

      // Then we set the fake data to be returned by the mock
      req.flush(mockData);

  })
  
  );
  

  it('testing http get for registration', 
    inject([HttpTestingController,AuthService],(httpMock: HttpTestingController, service: AuthService)=>{
    
      const mockData = [
      {
        "email": "xzcvxcv@gmail.com",
        "password": "Password@123",
        "firstName": "zcvcxz",
        "lastName": "xvcxb",
        "phonenumber": "432-353-4456",
        "ssn": "214-23-5435",
        "creditCardNumber": "3223-5656-4565-4665",
        "date": "09-2019",
        "cvv": "23244",
        "amount": 34535,
        "id": 1
      }
    ];
    
    service.getUserDetails("xzcvxcv@gmail.com", "Password@123", "zcvcxz", "xvcxb", "432-353-4456", 
      "214-23-5435","3223-5656-4565-4665", "09-2019", "23244" , 34535 ).subscribe(mockData => {
     
      expect(mockData[0].email).toBe("xzcvxcv@gmail.com");

    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('POST');

    // Then we set the fake data to be returned by the mock
    req.flush(mockData);

      })
      
  );
});
