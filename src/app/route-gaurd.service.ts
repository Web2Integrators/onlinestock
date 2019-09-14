import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService implements CanActivate{
  user: any;
  emailId: unknown;
  
  constructor(private router: Router) {
  }

  isLoggedIn: boolean = false;

  login() {
    
    this.isLoggedIn = true;
    console.log("router gaurd service --logged in")
  }

  logout()  {
    this.isLoggedIn = false;
    console.log("router gaurd service --logged out")
  }

  checkUser(){
   this.user = JSON.parse(localStorage.getItem('testObject'))
   if(this.user == undefined){

    this.emailId == undefined
   } else {
    Object.entries(this.user).forEach(
      ([key, value]) => {
        switch(key) {
          case "email":
              this.emailId = value
              break;
        }
      });
    }
  }
  canActivate(): boolean  {
    this.checkUser();
    if ((this.isLoggedIn == false && this.emailId == undefined)) {
      alert("Access Denied")
      this.router.navigate(['/']);
      return this.isLoggedIn;
    } else{
      return this.isLoggedIn =true
    }
    
  }
  }

 

