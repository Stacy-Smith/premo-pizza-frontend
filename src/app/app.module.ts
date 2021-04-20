import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { MatTableModule } from '@angular/material/table';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeUpdateComponent,
    EmployeeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
