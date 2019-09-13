import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { LoginPageService } from './login-page.service';

describe('LoginPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginPageService]
    });
  });

  it('should be created', () => {
    const service: LoginPageService = TestBed.get(LoginPageService);
    expect(service).toBeTruthy();
  });

  it('testing http get', inject(
    [HttpTestingController, LoginPageService],
    (httpMock: HttpTestingController, loginPageService: LoginPageService) => {
      const mockData = [
        {
          email: 'manogna.madineni6@gmail.com',
          password: 'Passwoerrcdf12',
          firstName: 'arg',
          lastName: 'madineni',
          phonenumber: '5182568300',
          ssn: '232-43-24322',
          creditCardNumber: '4324-3543-5465-476568',
          date: '09-2019',
          cvv: '234334',
          amount: 123,
          id: 1
        },
        {
          email: 'xzcvxcv@gmail.com',
          password: 'Password@123',
          firstName: 'zcvcxz',
          lastName: 'xvcxb',
          phonenumber: '432-353-44567',
          ssn: '214-23-54357',
          creditCardNumber: '3223-5656-4565-46656',
          date: '09-2019',
          cvv: '23244',
          amount: 34535,
          id: 2
        }
      ];

      loginPageService.getUserDetails().subscribe(mockData => {
        expect(Object.keys(mockData).length).toBe(2);
        // expect(mockData[1].length).toBe(11);
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:3000/users');
      expect(req.request.method).toEqual('GET');

      // Then we set the fake data to be returned by the mock
      req.flush(mockData);
    }
  ));
});
