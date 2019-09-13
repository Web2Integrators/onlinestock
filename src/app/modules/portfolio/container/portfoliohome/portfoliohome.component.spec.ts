import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { PortfoliohomeComponent } from './portfoliohome.component';
import { MyMaterialModule } from 'src/app/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { PortfolioAuthServiceService } from '../portfolio-auth-service.service';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

const fakeUser = {
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
}

let router: Router;

class fakePortfolioService {
  updateUserDetails(password, firstName, lastName, phonenumber, ssn, creditcardnumber, date, cvv, myid): Observable<any> {
    return of([fakeUser]);
  }
}

xdescribe('PortfoliohomeComponent', () => {
  let component: PortfoliohomeComponent;
  let fixture: ComponentFixture<PortfoliohomeComponent>;

  beforeEach(async(() => {

    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
     return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });

    TestBed.configureTestingModule({
      declarations: [ PortfoliohomeComponent ],
      imports:[ReactiveFormsModule,MyMaterialModule,HttpClientTestingModule,RouterTestingModule,AppModule],
      providers: [
        {
          provide: PortfolioAuthServiceService,
          useClass: fakePortfolioService
        },
        {provide: Router, useClass: class { navigateByUrl = jasmine.createSpy('navigateByUrl'); }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfoliohomeComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    localStorage.setItem('testObject',JSON.stringify(fakeUser));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit method is called',() => {
    spyOn(component,'edit').and.callThrough();
    component.edit();
    expect(component.edit).toHaveBeenCalled();
  });

  it('onupdate navigate to same url',() => {
    component.save();  
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard/portfolio/userportfolio');
  });

  it('update data through service',() => {
    component.save();  
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard/portfolio/userportfolio');
    component.updateUser$.subscribe((data)=>{
        expect(data[0]).toEqual(fakeUser);
    });
  });
});
