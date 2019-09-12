import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, MinLengthValidator, AbstractControl, ValidatorFn} from '@angular/forms';
import { MessageService } from 'src/app/message.service';
import { PortfolioAuthServiceService, User } from '../portfolio-auth-service.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfoliohome',
  templateUrl: './portfoliohome.component.html',
  styleUrls: ['./portfoliohome.component.scss']
})
export class PortfoliohomeComponent implements OnInit {
  user:User;
  userForm : FormGroup;
  myid:any;
  private isButtonVisible = true;


  constructor( private fb: FormBuilder, private service:PortfolioAuthServiceService, private router:Router) { 

  }

  
  
  ngOnInit() {


    this.userForm= this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
       email: ['', [Validators.required,Validators.maxLength(10),Validators.pattern("[0-9]+")]],
       password: ['', [Validators.required]],
       ssn: ['', [Validators.required,Validators.pattern("^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$")]],
       accountValue: [''],
      phone: ['', [Validators.required,Validators.maxLength(10),Validators.pattern("[0-9]+")]],
      creditcardno: ['', [Validators.required,Validators.pattern("^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$")]],
      cvv: ['', [Validators.required,Validators.pattern("^([0-9]{3,4})$")]],
      expirydate: ['', [Validators.required]],
    });

    const user = JSON.parse(localStorage.getItem('testObject'))
    //console.log(user,"**after**")
    Object.entries(user).forEach(
      ([key, value]) => {
        switch(key) {
          case "email":
              this.userForm.patchValue({email:value})
              break;
          case "firstName":
            this.userForm.patchValue({firstName:value})
                break;
          case "lastName":
            this.userForm.patchValue({lastName:value})
              break;
          case "password":
            this.userForm.patchValue({password:value})
              break;
          case "phonenumber":
            this.userForm.patchValue({phone:value})
              break;
          case "ssn":
            this.userForm.patchValue({ssn:value})
              break;
          case "creditCardNumber":
              this.userForm.patchValue({creditcardno:value})
                break;
          case "date":
              this.userForm.patchValue({expirydate:value});
                break;
          case "amount":
              this.userForm.patchValue({accountValue:value});
                break;
          case "cvv":
              this.userForm.patchValue({cvv:value});
                break;
          case "id":
              this.myid = value;
                break;
        }

      });


    // this.service.getUserDetails(this.myid).subscribe((data) => {
    //   this.user = data;
    //   console.log(data,'on launch');
    //   this.userForm.patchValue({email:this.user.email});
    //   this.userForm.patchValue({firstName:this.user.firstName});
    //   this.userForm.patchValue({lastName:this.user.lastName});
    //   this.userForm.patchValue({password:this.user.password});
    //   this.userForm.patchValue({phone:this.user.phonenumber});
    //   this.userForm.patchValue({ssn:this.user.ssn});
    //   this.userForm.patchValue({creditcardno:this.user.creditCardNumber});
    //   this.userForm.patchValue({expirydate:this.user.date});
    //   this.userForm.patchValue({accountValue:this.user.amount});
    //   this.userForm.patchValue({cvv:this.user.cvv});
    // });
    
    this.userForm.disable();
    
    document.getElementById('saveButton').className = "disable";
    document.getElementById('editButton').className = "enable";
    // this.userForm.patchValue({phone:'12345'});
    //this.userForm.setValue({phone : '12345'});
  }

  

  edit() {
   // console.log(this.userForm);
    this.userForm.enable();
    document.getElementById('editButton').className = "disable";
    document.getElementById('saveButton').className = "enable";
    this.userForm.controls['accountValue'].disable();
    this.userForm.controls['email'].disable();
  }

  save() {   
    const updateUser$:Observable<any> = this.service.updateUserDetails(
    this.userForm.get('password').value,
    this.userForm.get('firstName').value,
    this.userForm.get('lastName').value,
    this.userForm.get('phone').value,
    this.userForm.get('ssn').value,
    this.userForm.get('creditcardno').value,
    this.userForm.get('expirydate').value,
    this.userForm.get('cvv').value
    );

    //const getUser = (data) => this.service.getUserDetails(data);

    updateUser$.pipe(
      concatMap((data) => this.service.getUserDetails(data.id))
    ).subscribe((finalVal) => {
        this.userForm.disable();
        console.log(finalVal, 'get calll');
        localStorage.setItem('testObject',JSON.stringify(finalVal));
        alert("User Details Sucessfully updated");
        this.router.navigateByUrl('/dashboard/portfolio/userportfolio');
        window.location.reload();
    });

    
  //   this.service.updateUserDetails(
  //     this.userForm.get('password').value,
  //     this.userForm.get('firstName').value,
  //     this.userForm.get('lastName').value,
  //     this.userForm.get('phone').value,
  //     this.userForm.get('ssn').value,
  //     this.userForm.get('creditcardno').value,
  //     this.userForm.get('expirydate').value,
  //     this.userForm.get('cvv').value,
  //  ).subscribe((data)=>{
  //     this.userForm.disable();
  //     // console.log("Entered save success function");
  //     this.service.getUserDetails().subscribe((data)=> {
  //       console.log(data, 'get calll');
  //       localStorage.setItem('testObject',JSON.stringify(data));
  //       console.log(JSON.parse(localStorage.getItem('testObject')),'local');
  //       alert("User Details Sucessfully updated");
  //       //this.router.navigateByUrl('/dashboard/home');
  //       this.router.navigateByUrl('/dashboard/portfolio/userportfolio');
  //       window.location.reload();
  //     });
      
  //   });
  }

//   phoneValidator() {
//     var patt = new RegExp("\d{3}[\-]\d{3}[\-]\d{4}");
//     var x = (<HTMLInputElement>document.getElementById('phoneId'));
//     var res = patt.test(x.value);
//     if(!res){
//      x.value = x.value
//          .match(/\d*/g).join('')
//          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/).slice(1).join('-')
//          .replace(/-*$/g, '');
//     }
//   }

//   ssnValidator() {
//     var patt = new RegExp("\d{3}[\-]\d{2}[\-]\d{4}");
//     var x = (<HTMLInputElement>document.getElementById("ssnId"));
//     var res = patt.test(x.value);
//     if(!res){
//      x.value = x.value
//          .match(/\d*/g).join('')
//          .match(/(\d{0,3})(\d{0,2})(\d{0,4})/).slice(1).join('-')
//          .replace(/-*$/g, '');
//     }
//  }


//  cardValidator() {
//   var patt = new RegExp("\d{4}[\-]\d{4}[\-]\d{4}[\-]\d{4}");
//   var x = (<HTMLInputElement>document.getElementById("creditCardNoId"));
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
//   var x = (<HTMLInputElement>document.getElementById("cvvId"));
//   var res = patt.test(x.value);
//   if(!res){
//    x.value = x.value
//        .match(/\d*/g).join('')
//        .match(/(\d{0,4})/).slice(1).join('-')
//        .replace(/-*$/g, '');
//   }
// }


}





