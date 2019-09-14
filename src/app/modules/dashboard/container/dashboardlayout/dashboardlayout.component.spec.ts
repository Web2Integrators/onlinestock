import { LayoutModule,BreakpointObserver,BreakpointState } from "@angular/cdk/layout";
import { async,ComponentFixture,TestBed,inject } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";

import { DashboardlayoutComponent } from "./dashboardlayout.component";
import { Observable, from } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("DashboardlayoutComponent", () => {
  let component: DashboardlayoutComponent;
  let fixture: ComponentFixture<DashboardlayoutComponent>;

  const matchObj = [
    // initially all are false
    { matchStr: "(min-width: 1024px)", result: false },
    { matchStr: "(min-width: 1366px)", result: false },
    { matchStr: "(max-width: 1366px)", result: false }
  ];

  const fakeObserve = (s: string[]): Observable<BreakpointState> =>
    from(matchObj).pipe(
      filter(match => match.matchStr === s[0]),
      map(match => <BreakpointState>{ matches: match.result, breakpoints: {} })
    );
  const bpSpy = jasmine.createSpyObj("BreakpointObserver", ["observe"]);
  bpSpy.observe.and.callFake(fakeObserve);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardlayoutComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      providers: [
        { provide: BreakpointObserver, useValue: bpSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    var store = {};
    fixture = TestBed.createComponent(DashboardlayoutComponent);
    component = fixture.componentInstance;

    localStorage.setItem('testObject',JSON.stringify({
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
    }));
   
    spyOn(localStorage, "setItem").and.callFake(
      (key: string, value: string): string => {
        return (store[key] = <string>value);
      }
    );

    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
      return store[key] || null;
     });

    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
   
  });

  it("should compile", () => {
    expect(component).toBeTruthy();
  });

  it("checking logout()", inject([Router], (router: Router) => {
    fixture.detectChanges();
    spyOn(router, "navigate").and.stub();
    component.onLogOut();
    expect(localStorage.removeItem("testObject")).toBe(undefined);
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  }));

  it('checking user defined ngOnInit', () => {
    localStorage.setItem(
      "testObject",
      JSON.stringify({
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
      })
    );
    fixture.detectChanges();
    expect(component.emailId).toBe('tom@gmail.com')
    expect(component.firstName).toBe('tom')
    expect(component.lastName).toBe('holleren')

  });

  // it('user not defined on ngOnInit', () => {

  //   fixture.detectChanges();
  // });
  
  

});
