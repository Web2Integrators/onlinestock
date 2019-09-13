import { Component, OnInit } from '@angular/core';
import { PortfolioAuthServiceService , Stock, User } from '../portfolio-auth-service.service';
import { element } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stockportfolio',
  templateUrl: './stockportfolio.component.html',
  styleUrls: ['./stockportfolio.component.scss']
})
export class StockportfolioComponent implements OnInit {
  stocks$:Observable<Stock[]>;
  email:any;
  user:User;
  constructor(  private DataService:PortfolioAuthServiceService) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('testObject')));
    this.user = JSON.parse(localStorage.getItem('testObject'))
    //console.log(user,"**after**")
    Object.entries(this.user).forEach(
      ([key, value]) => {
        switch(key) {
          case "email":
              this.email = value;
              break;
        }

      });

    this.stocks$ = this.DataService.getStockDetails(this.email);
    this.stocks$.subscribe((data) => {
      if(data.length ==0) {
        document.getElementById('header').className="disable";
        alert("No Stocks available");
      } else {
        document.getElementById('header').className="enable";
      }
      //console.log(data);
    })
  }

  calculateTotal(price,quantity) {
    return price*quantity;
  }

}
