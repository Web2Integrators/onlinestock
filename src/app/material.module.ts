import { NgModule } from  '@angular/core';
 
import {MatNativeDateModule,MatDatepickerModule,MatIconModule,
    MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,
    MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule, MatSidenavModule} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
imports: [MatButtonModule,MatToolbarModule,
    MatNativeDateModule,MatDatepickerModule,
    MatIconModule,MatButtonModule,MatCheckboxModule, 
    MatToolbarModule, MatCardModule,MatFormFieldModule,
    MatInputModule,MatRadioModule,MatListModule,FormsModule, 
    ReactiveFormsModule,MatGridListModule,FlexLayoutModule, MatSidenavModule, MatGridListModule],
    
exports: [MatNativeDateModule,FormsModule,
    MatDatepickerModule,MatIconModule,MatButtonModule,
    MatCheckboxModule, MatToolbarModule, MatCardModule,
    MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule, MatSidenavModule, MatGridListModule]
 
})
 
export  class  MyMaterialModule { }