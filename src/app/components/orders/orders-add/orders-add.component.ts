import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Employee } from 'src/app/models/employee';
import { OrderProduct } from 'src/app/models/orderproduct';
import { Order } from 'src/app/models/orders';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrderproductService } from 'src/app/services/orderproduct.service';
import { OrderService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss']
})
export class OrdersAddComponent implements OnInit {

  employees: Employee[] = [];
  customers: Customer[] = [];
  products: Product[] = [];
  orderProducts: OrderProduct[] = [];
  order: Order = null;

  constructor(private employeeService: EmployeeService,
              private customerService: CustomerService,
              private productService: ProductService,
              private orderService: OrderService,
              private orderProductService: OrderproductService) { }

  ngOnInit(): void {
    this.retrieveCustomers();
    this.retrieveEmployees();
    this.retrieveProducts();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll()
      .subscribe(data => {
        this.employees = data;
        console.log("Employees");
        console.log(this.employees);
      },
      error => {
        console.log(error);
      });
  }

  retrieveCustomers(): void {
    this.customerService.getAll()
      .subscribe(data => {
        this.customers = data;
        console.log("Customers");
        console.log(this.customers);
      },
      error => {
        console.log(error);
      });
  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe(data => {
        this.products = data;
        console.log("Products");
        console.log(this.products);
      },
      error => {
        console.log(error);
      });
  }

}
