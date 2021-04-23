import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Employee } from 'src/app/models/employee';
import { Order } from 'src/app/models/orders';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  orders: Order[] = [];
  employees: Employee[] = [];
  products: Product[] = [];

  // Employee chart data
  employeeSalesData = [];

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

  constructor(private activatedRoute: ActivatedRoute) {
                this.activatedRoute.data.subscribe(data => {
                  this.orders = data.resolver[0];
                  this.employees = data.resolver[1];
                  this.products = data.resolver[2];  
                });
              }

  ngOnInit(): void {
    this.getEmployeeSalesData();
  }

  getEmployeeSalesData(): void {
    let labels = [];
    let values = [];
    this.employees.forEach(employee => {
      labels.push(employee.name);
    });
    labels.forEach(name => {
      let total = 0;
      this.orders.forEach(order => {
        if(order.employee.name == name){
          total += order.total;
        }
      });
      values.push(total);
    })
    let index = 0;
    labels.forEach(label => {
      this.employeeSalesData.push({name: label, value: values[index]});
      index++;
    })
  }

  getProductChartLabels(): void {
    this.products.forEach(product => {
      this.barChartLabelsProduct.push(product.item);
    })
  }

}
