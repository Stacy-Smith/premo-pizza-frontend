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
import { NgxChartsModule }from '@swimlane/ngx-charts';

import { ProductComponent } from './components/product/product.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersAddComponent } from './components/orders/orders-add/orders-add.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EmployeeOrdersComponent } from './components/employee/employee-orders/employee-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    EmployeeComponent,
    EmployeeUpdateComponent,
    EmployeeAddComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    OrdersComponent,
    OrdersAddComponent,
    OrderDetailComponent,
    ReportsComponent,
    EmployeeOrdersComponent
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
    MatTableModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
