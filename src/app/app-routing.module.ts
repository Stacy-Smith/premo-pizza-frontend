import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
