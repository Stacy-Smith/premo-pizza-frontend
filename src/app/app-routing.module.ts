import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { EmployeeAddComponent } from './components/employee/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProductComponent } from './component/product/product.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'customers/:id', component: CustomerEditComponent},
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/add', component: EmployeeAddComponent },
  { path: 'employees/:id', component: EmployeeUpdateComponent},
  { path: 'products', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
