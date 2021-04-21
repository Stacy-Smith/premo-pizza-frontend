import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { OrdersAddComponent } from './components/orders/orders-add/orders-add.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  // Customer Routes
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'customers/:id', component: CustomerEditComponent},

  // Employee Routes
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/add', component: EmployeeAddComponent },
  { path: 'employees/:id', component: EmployeeUpdateComponent},

  // Orders Routes
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/add', component: OrdersAddComponent },

  // Product routes
  { path: 'products', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
