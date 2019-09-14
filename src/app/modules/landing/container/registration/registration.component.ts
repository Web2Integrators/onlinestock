import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
 
  regDetailsForm:FormGroup;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {

    this.regDetailsForm = new FormGroup ({
            firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),

            lastName: new FormControl(''),

            email: new FormControl('',[Validators.required,Validators.email]),

            phonenumber: new FormControl('',[Validators.required,Validators.maxLength(10),
              Validators.pattern("[0-9]+")]),
            
            password: new FormControl('',[Validators.required]),
            
            ssn: new FormControl('',[Validators.required,
              Validators.pattern("^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$")]),
                    // Validators.minLength(16),Validators.maxLength(16)]
            
            creditCardNumber: new FormControl('',[Validators.required,
              Validators.pattern("^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$")]), 
                    //Mastercard starting with 51-55
            
            date: new FormControl('',[Validators.required]),
            
            cvv: new FormControl('',[Validators.required,Validators.pattern("^([0-9]{3,4})$")]),
            
            amount: new FormControl('',Validators.required)
      })
  }



oncheck(){
  this.auth.getUserDetails(
    this.regDetailsForm.get('email').value,
    this.regDetailsForm.get('password').value,
    this.regDetailsForm.get('firstName').value,
    this.regDetailsForm.get('lastName').value,
    this.regDetailsForm.get('phonenumber').value,
    this.regDetailsForm.get('ssn').value,
    this.regDetailsForm.get('creditCardNumber').value,
    this.regDetailsForm.get('date').value,
    this.regDetailsForm.get('cvv').value,
    this.regDetailsForm.get('amount').value

    ).subscribe((data)=>{
     alert("Registration Sucessful !!");
    this.router.navigate(['/home']);

  }, error => {
    this.handleError(error); //handling error

   }
  );

}
 onRegitration(){
  this.auth.getDetails().subscribe((data: any[]) => {

          if(data.length == 0) {
            this.oncheck();
          }
          else {
          
            for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            
            if (obj.email !==  this.regDetailsForm.get('email').value ) {
              this.oncheck();
                break;
            } 
          else {
              alert('email already exists');
                break;
            }
          }
        }
     })
  };


public handleError(errorResponse: HttpErrorResponse) {
      // client side or server error
  if (errorResponse.error instanceof ErrorEvent) {
      // console.error("client side error",errorResponse.error.message);
    alert('client side error,please try again');
  } else {
      // console.error("Server side error",errorResponse);
    alert('server side error,please try again');
  }
  return throwError('there is problem with service');
}

// ssnValidator() {
//     var patt = new RegExp("\d{3}[\-]\d{2}[\-]\d{4}");
//     var x = (<HTMLInputElement>document.getElementById("ssn"));
//     var res = patt.test(x.value);
//     if(!res){
//      x.value = x.value
//          .match(/\d*/g).join('')
//          .match(/(\d{0,3})(\d{0,2})(\d{0,4})/).slice(1).join('-')
//          .replace(/-*$/g, '');
//     }
//  }

//  cardValidator() {
//   var patt = new RegExp("\d{4}[\-]\d{4}[\-]\d{4}[\-]\d{4}{16}");
//   var x = (<HTMLInputElement>document.getElementById("card"));
//   var res = patt.test(x.value);
//   if(!res){
//    x.value = x.value
//        .match(/\d*/g).join('')
//        .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/).slice(1).join('-')
//        .replace(/-*$/g, '');
//   }
// }

// cvvValidator() {
//   var patt = new RegExp("\d{4}");
//   var x = (<HTMLInputElement>document.getElementById("cvv"));
//   var res = patt.test(x.value);
//   if(!res){
//    x.value = x.value
//        .match(/\d*/g).join('')
//        .match(/(\d{0,4})/).slice(1).join('-')
//        .replace(/-*$/g, '');
//   }
// }

//  phoneValidator() {
//   var patt = new RegExp("\d{3}[\-]\d{3}[\-]\d{4}");
//   var x = (<HTMLInputElement>document.getElementById('phone'));
//   var res = patt.test(x.value);
//   if(!res){
//    x.value = x.value
//        .match(/\d*/g).join('')
//        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/).slice(1).join('-')
//        .replace(/-*$/g, '');
//   }
// }
}
