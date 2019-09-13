import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import { StockportfolioComponent } from './stockportfolio.component';
import { PortfolioAuthServiceService, Stock } from '../portfolio-auth-service.service';
import { of, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';


const fakeStock = 
{
  "email": "tom@gmail.com",
  "stockid": "1",
  "name": "Apple",
  "quantity": "5",
  "price": "100",
  "value": "500",
  "id": "1"
}

class fakePortfolioService {
  getStockDetails(email): Observable<Stock[]> {
    return of([fakeStock]);
  }
}

describe('StockportfolioComponent', () => {
  let component: StockportfolioComponent;
  let fixture: ComponentFixture<StockportfolioComponent>;

  beforeEach(async(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
     return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });

    TestBed.configureTestingModule({
      declarations: [ StockportfolioComponent ],
      imports:[MatExpansionModule,RouterTestingModule,HttpClientTestingModule,AppModule],
      providers: [
        {
          provide: PortfolioAuthServiceService,
          useClass: fakePortfolioService
        }
      ]
    })
    .compileComponents();
  }));

  const testObject = {
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
  

  beforeEach(() => {
    fixture = TestBed.createComponent(StockportfolioComponent);
    component = fixture.componentInstance;
    localStorage.setItem('testObject',JSON.stringify(testObject));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get data through service', () => {
    fixture.detectChanges();
    component.stocks$.subscribe((data) => {
      console.log(data[0]);
      expect(data[0]).toEqual(fakeStock);
    })
  });

});
