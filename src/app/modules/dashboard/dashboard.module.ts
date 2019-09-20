import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './container/home/home.component';
import { DashboardlayoutComponent } from './container/dashboardlayout/dashboardlayout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MyMaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [ HomeComponent, DashboardlayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    MyMaterialModule
  ]
})
export class DashboardModule { }
