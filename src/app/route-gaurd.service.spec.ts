import { TestBed } from '@angular/core/testing';

import { RouteGaurdService } from './route-gaurd.service';
import { Router } from '@angular/router';

describe('RouteGaurdService', () => {
  let router: Router;
  let service:RouteGaurdService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: Router, useClass: class { navigate = jasmine.createSpy('navigate');}},
                RouteGaurdService ]
  }));

  beforeEach(() => {

  var store = {};

  service = TestBed.get(RouteGaurdService);
  router = TestBed.get(Router);

  spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
   return store[key] || null;
  });
  // spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
  //   delete store[key];
  // });
  spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
    return store[key] = <string>value;
  });
 
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checking login/logout method ', () => {
    service.isLoggedIn = false
    service.login();
    expect(service.isLoggedIn).toBe(true);
    service.logout();
    expect(service.isLoggedIn).toBe(false);
  });

  it('checking checkUser() emailid undefined', () => {
    service.checkUser();
    expect(service.emailId).toBe(undefined);
  });
  
  it('checking checkUser() with emailId', () => {
    localStorage.setItem('testObject',JSON.stringify({
      email: "tom@gmail.com",
      password: "Password@12",
      firstName: "tom",
      lastName: "holleren",
      phonenumber: "678-688-78798",
      ssn: "678-67-8789789",
      creditCardNumber: "6786-7869-8778",
      date: "09-2018",
      cvv: "123",
      amount: 100500,
      id: 1
    }));
    service.checkUser();
    expect(service.emailId).toBeDefined();
  });
  
  it('checking canActivate', () => {
    spyOn(service,'checkUser').and.callThrough();
    service.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  });
  
  it('checking canActivate else ', () => {
    spyOn(service,'checkUser').and.callThrough();
    service.isLoggedIn = true;
    service.emailId != undefined;
    service.canActivate();
    expect(service.isLoggedIn).toBe(true)
  });
  
});

