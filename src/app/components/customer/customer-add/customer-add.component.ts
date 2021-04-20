import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customer: Customer = {
    name: '',
    address: '',
    phoneNumber: null,
    zipCode: null
  }
  submitted: boolean = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  saveCustomer(): void {
    this.customerService.create(this.customer)
      .subscribe(response => {
        console.log(response);
        this.submitted = true;
      }, error => {
        console.log(error);
      })
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = {
      name: '',
      address: '',
      phoneNumber: null,
      zipCode: null
    };
  }

}
