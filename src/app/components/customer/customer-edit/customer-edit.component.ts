import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  currentCustomer: Customer = null;
  message: string = ''

  constructor(private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getCustomer(this.route.snapshot.paramMap.get('id'));
  }

  getCustomer(id): void {
    this.customerService.get(id)
      .subscribe(data => {
        this.currentCustomer = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  updateCustomer(): void {
    this.customerService.update(this.currentCustomer.id, this.currentCustomer)
      .subscribe( response => {
        console.log(response);
        this.message = 'The customer was updated successfully!';
      }, error => {
        console.log(error);
      });
  }

  deleteCustomer(): void {
    this.customerService.delete(this.currentCustomer.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/customers']);
        },
        error => {
          console.log(error);
        });
  }

}
