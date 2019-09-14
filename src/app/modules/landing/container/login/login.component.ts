import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageService } from './login-page.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LayoutComponent } from '../layout/layout.component';
import { MatDialogRef } from '@angular/material';
import { RouteGaurdService } from 'src/app/route-gaurd.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** UserInput from keyboard */
  email: string;
  password: string;

  /** Storing http get response */
  users: any;

   /** display error message */
  errorMessage: string;
  loginLabel: string = 'Log in';

   /** Injecting services */
  constructor(private router: Router, private loginPageService: LoginPageService, 
              public dialogRef: MatDialogRef<LayoutComponent>,
              private routerGaurd: RouteGaurdService) { }

  ngOnInit() {
  }

  /** function triggers on Submit */
  login() {
    // if(this.loginLabel ==='Log in'){
    //    this.routerGaurd.login();
    //    this.loginLabel = 'Log out';
      
    //  } else {
    //    this.routerGaurd.logout();
      
    //    this.loginLabel = 'Log in';
    //    this.router.navigate(['/'])
      
    //  }
    console.log(this.loginLabel, "login label")
    if(this.email == undefined || this.password == undefined){
      this.errorMessage = 'Please enter Email Id/ password.'
    }else {

    /**  calls the service which has http.get logic and subscribes to the response */
    this.loginPageService.getUserDetails().subscribe((data) =>{

      this.users = data;
      console.log(data,"....data...")

      /**loops through the Json object untill matched record is found */
      this.users.forEach((element) => {
      
        if( (this.email == element.email) && (this.password == element.password) )  {
          this.routerGaurd.login();
          console.log('element...',element)
          localStorage.setItem('testObject', JSON.stringify(element));
          this.dialogRef.close(); //closing login Dialog box
          
          this.router.navigate(['/dashboard']); //navigating to dashboard
          //break;

        } else {
          
          this.errorMessage = 'Email id or Password is incorrect. Please try again.';
          this.routerGaurd.logout();
        }
      })
    }, error => {

         //console.log(error, 'inside ......');
         this.handleError(error); // handling error

        })
      }
  }
  public handleError(errorResponse: HttpErrorResponse) {
    // client side or server error
    if (errorResponse.error instanceof ErrorEvent) {
      // console.error("client side error",errorResponse.error.message);
      alert('client side error,please try again');
    } else {
       console.error("Server side error",errorResponse);
      alert('server side error,please try again');
    }
    return throwError('there is problem with service');
  }

}
