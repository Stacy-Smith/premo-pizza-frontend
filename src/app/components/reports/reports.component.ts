import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Employee } from 'src/app/models/employee';
import { Order } from 'src/app/models/orders';
import { Product } from 'src/app/models/product';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrderService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit, AfterContentInit {

  orders: Order[] = [];
  employees: Employee[] = [];
  products: Product[] = [];

  // General chart data
  barChartOptions: ChartOptions = { responsive: true };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  // Employee chart data
  barChartLabelsEmployee: Label[] = [];
  barChartDataEmployee: ChartDataSets[] = [{ data: [], label: 'YTD Sales by Employee' }];

  // Zip Code Chart data
  barChartLabelsZipcode: Label[] = ['55501', '55502', '55503', '55504'];
  barChartDataZipcode: ChartDataSets[] = [{ data: [], label: 'YTD Sales by Zipcode' }];

  // Monthly chart data
  barChartLabelsMonthly: Label[] = ['January', 'February', 'March', 'April', 'May', 
                                    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  barChartDataMonthly: ChartDataSets[] = [{ data: [], label: 'YTD Sales by Month' }];

  // Product chart data
  barChartLabelsProduct: Label[] = [];
  barChartDataProduct: ChartDataSets[] = [{ data: [], label: 'YTD Sales by Product' }];

  constructor(private orderService: OrderService,
              private employeeService: EmployeeService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveAllData();
  }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
    this.getTotalByEmployee();
    console.log(this.barChartDataEmployee);
  }

  retrieveOrders(): void {
    this.orderService.getAll()
      .subscribe(data => {
        console.log(data);
        this.orders = data;
      },
      error => {
        console.log(error);
      });
  }

  retrieveEmployees(): void {
    this.employeeService.getAll()
      .subscribe(data => {
        console.log(data);
        this.employees = data;
        this.getEmployeeChartLabels();
        console.log(this.barChartLabelsEmployee);
      },
      error => {
        console.log(error);
      });
  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe(data => {
        console.log(data);
        this.products = data;
        this.getProductChartLabels();
        console.log(this.barChartLabelsProduct);
      },
      error => {
        console.log(error);
      });
  }

  retrieveAllData(): void {
    this.retrieveOrders();
    this.retrieveEmployees();
    this.retrieveProducts();
  }

  getEmployeeChartLabels(): void {
    this.employees.forEach(employee => {
      this.barChartLabelsEmployee.push(employee.name);
    })
  }

  getProductChartLabels(): void {
    this.products.forEach(product => {
      this.barChartLabelsProduct.push(product.item);
    })
  }

  getTotalByEmployee(): void {
    this.barChartLabelsEmployee.forEach(name => {
      let total = 0;
      this.orders.forEach(order => {
        if(order.employee.name == name){
          total += order.total;
        }
      });
      this.barChartDataEmployee[0].data.push(total);
    })
  }

}
