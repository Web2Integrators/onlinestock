import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { AuthService } from 'src/app/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MyMaterialModule } from 'src/app/material.module';
import { HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';
import { Observable, of, throwError } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let router: Router;
  let mockRouter:any;
  let dummyservice:any;
  const mockData = [
    {
      "email": "kudani@gmail.com",
      "password": "Password@123",
      "firstName": "zakaj",
      "lastName": "uahaa",
      "phonenumber": "432-353-4456",
      "ssn": "214-23-5435",
      "creditCardNumber": "3223-5656-4565-4665",
      "date": "09-2019",
      "cvv": "23244",
      "amount": 34535
    }
  ];

  // const mockData1 = [];

   class dummyService {
 
  getDetails(){
    return  of(mockData);
  };
  getUserDetails(){
    return  of(mockData);
 
}
   };


  beforeEach((async() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [FormsModule,AppModule,ReactiveFormsModule,RouterTestingModule,BrowserAnimationsModule, MatDatepickerModule, MatExpansionModule, MatTooltipModule, MyMaterialModule],
      providers:  [{provide:AuthService, useClass: dummyService},dummyService, HttpClient, HttpHandler,HttpTestingController,
      {provide:Router, useValue: mockRouter},]

      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    dummyservice = TestBed.get(dummyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create regDetailsForm', () => {
    component.ngOnInit()
    expect(component.regDetailsForm.valid).toBeFalsy();

  });

  it('testing Email', () => {
    let errors = {};
  let email = component.regDetailsForm.controls['email'];
  expect(email.valid).toBeFalsy();

  // Email field is required
  errors = email.errors || {};
  expect(errors['required']).toBeTruthy();

  // Set email to something
  email.setValue("test");
  errors = email.errors || {};
  expect(errors['required']).toBeFalsy();


  // Set email to something correct
  email.setValue("test@example.com");
  errors = email.errors || {};
  expect(errors['required']).toBeFalsy();
  });

//   fit('should navigate to other page', () => {
//     component.oncheck();
    
// });

it('should check the post call data', () => {
  //spyOn(component,'onRegistration').and.callThrough();
  var spy = spyOn(component,'oncheck').and.callThrough();
  component.onRegitration();
  expect(spy).toHaveBeenCalled();
  expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
});

it('should check the post call data', () => {
    spyOn(component,'handleError').and.callThrough();
  const mockedservice= fixture.debugElement.injector.get(dummyService);
const usergetdetailsMockedcall = spyOn(mockedservice,'getUserDetails').and.returnValue(throwError({status: 'some error'}));
component.onRegitration();
component.oncheck();
expect(component.handleError).toHaveBeenCalled();
});

});