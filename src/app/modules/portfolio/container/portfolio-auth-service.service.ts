import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/message.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioAuthServiceService {
  email:any;
  id:any;

  constructor(private http:HttpClient) { }

  updateUserDetails(password, firstName, lastName, phonenumber, ssn, creditcardnumber, date, cvv, myid ){
      const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'my-auth-token'
      })
    };
      const putData = { 
        password:password,
        firstName: firstName,
        lastName: lastName,
        phonenumber: phonenumber,
        ssn: ssn,
        creditCardNumber:creditcardnumber,
        date:date,
        cvv:cvv
      };
      return this.http.patch(`http://localhost:3000/users/${myid}`,putData,httpOptions)
    }

    getStockDetails(myemail):Observable<Stock[]> {
      //const email = "jsmith@virtusa.com"
      return this.http.get<Stock[]>(`http://localhost:3000/orders?email=${myemail}`)
    }
}


/* Defines the product entity */
export class User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phonenumber: string;
  ssn: string;
  creditCardNumber:string;
  date:string;
  amount:any;
  cvv:string;
  id:any
}

export class Stock {
  email: string;
  stockid: string;
  name: string;
  quantity: string;
  price: string;
  value: string;
}