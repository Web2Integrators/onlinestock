import { TestBed } from '@angular/core/testing';

import { RouteGaurdService } from './route-gaurd.service';
import { Router } from '@angular/router';

xdescribe('RouteGaurdService', () => {
  let router: Router;
  let service:RouteGaurdService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: Router, useClass: class { navigate = jasmine.createSpy('navigate');}},
  RouteGaurdService ]
 
  }));

  beforeEach(() => {
    service = TestBed.get(RouteGaurdService);
  });
  beforeEach(() => {
  var store = {};

  spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
   return store[key] || null;
  });
  // spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
  //   delete store[key];
  // });
  spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
    return store[key] = <string>value;
  });
  spyOn(localStorage, 'clear').and.callFake(() =>  {
      store = {};
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
   // service.checkUser();
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
  });
  
  it('checking canActivate', () => {
    spyOn(service,'checkUser').and.callThrough();
    service.canActivate();
  });
  
  it('checking canActivate else ', () => {
    spyOn(service,'checkUser').and.callThrough();
    service.isLoggedIn = true;
    service.canActivate();
  });
  
});

