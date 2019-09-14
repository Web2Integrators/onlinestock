import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouteGaurdService } from './route-gaurd.service';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyMaterialModule,
    MatInputModule
  ],
  providers: [RouteGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
