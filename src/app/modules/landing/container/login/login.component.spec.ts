import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginPageService } from './login-page.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { RouteGaurdService } from 'src/app/route-gaurd.service';
import { LayoutComponent } from '../layout/layout.component';
import { MyMaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const fakeUserData = [
  {
    email: 'jdoe@gmail.com',
    password: 'Jdoe@123',
    firstName: 'John',
    lastName: 'Doe',
    phonenumber: '555-676-9090',
    ssn: '321-45-69089',
    creditCardNumber: '4444-7867-9845-1234',
    date: '08-2018',
    amount: 10000,
    cvv: '100',
    id: 1
},
{
  email: 'mjacob@gmail.com',
  password: 'Mjacob@123',
  firstName: 'Ava',
  lastName: 'Jacob',
  phonenumber: '303-989-87898',
  ssn: '123-45-6789',
  creditCardNumber: '2345-6789-9876-5432',
  date: '08-2023',
  amount: 5000,
  cvv: '608',
  id: 2
}
];
const mockLogInPageSvc = {
  getUserDetails: () => of(fakeUserData)
};

xdescribe('LoginComponent', () => {
  let cmp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let logInPageSvc: LoginPageService;
  let router: Router;
  let matDialogref: MatDialogRef<LayoutComponent>;
  let routeGuard: RouteGaurdService;

  beforeEach((async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        MyMaterialModule, BrowserAnimationsModule
      ],
      providers: [
        {provide: MatDialogRef, useClass: class { close = jasmine.createSpy('close'); }},
        {provide: LoginPageService, useValue: mockLogInPageSvc},
        {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        {provide: RouteGaurdService, useClass: class {login = jasmine.createSpy('login'); }}
      ]
    }).compileComponents();
  })));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    cmp = fixture.componentInstance;
    logInPageSvc = TestBed.get(LoginPageService);
   // router = fixture.debugElement.injector.get(Router);
    matDialogref = TestBed.get(MatDialogRef);
    router = TestBed.get(Router);
    routeGuard = TestBed.get(RouteGaurdService);
  });

  // Test for creating the component
  it('Should Create the component', async () => {
    // assert
    expect(cmp).toBeTruthy();
  });
  // Test for initial form validation
  it('Form should be invaliod onInit', async () => {
    // arrange
    fixture.detectChanges();
    // assert
    expect(cmp.email).toBe(undefined);
    expect(cmp.password).toBe(undefined);
  });
  // Test for router navigation to Dashboard after successful login
  it('Form should navigate to dashboard on successful login', async () => {
    // arrange
    fixture.detectChanges();
    // set form model
    cmp.email = fakeUserData[0].email;
    cmp.password = fakeUserData[0].password;
    fixture.detectChanges();
    // act
    cmp.login();
    fixture.detectChanges();
    // assert
    expect(cmp.users.length).toBe(2);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);

  });
  // Test for invalid user Email/ passeord
  it('Form should display error message saying EmailId/ Password is not entered.', async() => {
    // arrange
    fixture.detectChanges();
    // set form modal
    cmp.email = undefined;
    cmp.password = undefined;
    fixture.detectChanges();
    // act
    cmp.login();
    fixture.detectChanges();
    // assert
    expect(cmp.email).toBeFalsy();
    expect(cmp.password).toBeFalsy();
  });
  // Throw exception on error
  it('Form should throw new exception', async() => {
    // arrange
    fixture.detectChanges();
    // set form model
    cmp.email = undefined;
    cmp.password = undefined;
    fixture.detectChanges();
    // act
    cmp.login();
    fixture.detectChanges();
    // assert
    expect(cmp.email).toBeFalsy();
    expect(cmp.password).toBeFalsy();
  });

  it('Form should throw new exception', async() => {
    // arrange
    fixture.detectChanges();
    // set form model
    cmp.email = fakeUserData[0].email;
    cmp.password = fakeUserData[0].password;
    spyOn(logInPageSvc,'getUserDetails').and.returnValue(throwError({status: 404}));
    var spy = spyOn(cmp,'handleError').and.callThrough();
    // act
    cmp.login();
    fixture.detectChanges();
    // assert
    expect(spy).toHaveBeenCalled();
  });

});