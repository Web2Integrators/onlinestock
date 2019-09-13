import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardlayout',
  templateUrl: './dashboardlayout.component.html',
  styleUrls: ['./dashboardlayout.component.scss']
})
export class DashboardlayoutComponent implements OnInit {
  userInfo: any;
  firstName: any;
  lastName: any;
  emailId: any;
  availableBalance: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('***before**');
    const user = JSON.parse(localStorage.getItem('testObject'));
    if (user === undefined) {
      alert(' Access Denied, User not defined');
      this.onLogOut();
    } else {
      console.log(user, '**after**');
      Object.entries(user).forEach(([key, value]) => {
        switch (key) {
          case 'email':
            this.emailId = value;
            break;
          case 'firstName':
            this.firstName = value;
            break;
          case 'lastName':
            this.lastName = value;
            break;
          case 'amount':
            this.availableBalance = value;
            break;
        }
      });
    }
  }

  onLogOut() {
    localStorage.removeItem('testObject');
    // console.log(JSON.parse(localStorage.getItem('testObject')))
    this.router.navigate(['/']);
  }
}
