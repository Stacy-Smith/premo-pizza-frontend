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

import { ProductComponent } from './component/product/product.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    EmployeeComponent,
    EmployeeUpdateComponent,
    EmployeeAddComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent
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
