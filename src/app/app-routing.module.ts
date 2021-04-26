import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeOrdersComponent } from './components/employee/employee-orders/employee-orders.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { OrdersAddComponent } from './components/orders/orders-add/orders-add.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ResolverService } from './services/resolver.service';

const routes: Routes = [

  { path: '', component: HomeComponent},
  // Customer Routes
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'customers/:id', component: CustomerEditComponent},

  // Employee Routes
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/add', component: EmployeeAddComponent },
  { path: 'employees/orders/:id', component: EmployeeOrdersComponent },
  { path: 'employees/:id', component: EmployeeUpdateComponent},

  // Orders Routes
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/add', component: OrdersAddComponent },
  { path: 'orders/:id', component: OrderDetailComponent},

  // Product routes
  { path: 'products', component: ProductComponent },

  //Reports routes
  { path: 'reports', component: ReportsComponent, resolve: {resolver: ResolverService} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ResolverService]
})
export class AppRoutingModule { }
