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
  zipcodeSalesData = [{name: '55501', value: 0}, {name: '55502', value: 0}, 
                      {name: '55503', value: 0}, {name: '55504', value: 0}];

  // Monthly chart data
  months = ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'];
  monthlySalesData = [];

  constructor(private activatedRoute: ActivatedRoute) {
                this.activatedRoute.data.subscribe(data => {
                  this.orders = data.resolver[0];
                  this.employees = data.resolver[1];
                  this.products = data.resolver[2];  
                });
              }

  ngOnInit(): void {
    this.getEmployeeSalesData();
    this.getZipcodeSalesData();
    this.getMonthlySalesData();
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

  getZipcodeSalesData(){
    this.zipcodeSalesData.forEach(data => {
      this.orders.forEach(order => {
        if(Number(data.name) == order.customer.zipCode){
          data.value += order.total;
        }
      })
    })
  }

  getMonthlySalesData() {
    this.months.forEach(month => {
      this.monthlySalesData.push({name: month, value: 0})
    })
    this.orders.forEach(order => {
      let date = new Date(order.timestamp);
      this.monthlySalesData[date.getMonth()].value += order.total;
    })
  }

}
