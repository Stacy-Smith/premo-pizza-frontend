import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrderService } from 'src/app/services/orders.service';

export interface Order {
  orderId: number;
  customer: object;
  employee: object;
  timestamp: Date;
  subtotal: number;
  discount: number;
  total: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'customer', 'employee', 'date', 'zipCode', 'subtotal', 'discount', 'total']
  orders: Order [] = [];
  ordersTotal = 0;
  dataSource: MatTableDataSource<Order>;
  employees: Employee[] = [];
  selectedEmployee = null;
  pipe: DatePipe;
  zips = [55501, 55502, 55503, 55504]
  startDate: Date = null;
  endDate: Date = null;
  zipCode: number = null;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  constructor(private orderService: OrderService, private employeeService: EmployeeService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.retrieveOrders();
    this.retrieveEmployees();
    this.clearFilter();
  }

  retrieveOrders(): void {
    this.orderService.getAll()
      .subscribe(data => {
        this.orders = data;
        console.log(this.orders);
        this.orders.forEach(order => {
          this.ordersTotal += order.total;
        })
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
      });
  }

  retrieveEmployees(): void {
    this.employeeService.getAll()
      .subscribe( data => {
        this.employees = data;
      }, error => {
        console.log(error);
      })
  }

  saveStartDate(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.startDate = event.value;
  }

  saveEndDate(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.endDate = event.value;
  }

  saveZipCode(event: MatSelectChange) {
    this.zipCode = event.value;
  }

  saveEmployee(event: MatSelectChange) {
    this.selectedEmployee = event.value;
  }

  applyFilter() {
    this.ordersTotal = 0;
    let tempEmp = [];
    if(this.selectedEmployee){
      this.ordersTotal = 0;
      this.orders.forEach( order => {
        if(order.employee['id'] == this.selectedEmployee.id){
          tempEmp.push(order);
          this.ordersTotal += order.total;
        }
      })
    } else {
      tempEmp = this.orders;
    }

    let temp = [];
    if (this.zipCode) {
      this.ordersTotal = 0;
      tempEmp.forEach(order => {
        if (order.customer['zipCode'] == this.zipCode) {
          temp.push(order);
          this.ordersTotal += order.total;
        }
      })
    } else {
      temp = tempEmp;
    }
    let tempDate = [];
    if (this.startDate && this.endDate){
      this.ordersTotal = 0;
      temp.forEach(order => {
        if (new Date(order.timestamp) >= this.startDate && new Date(order.timestamp) <= this.endDate){
          tempDate.push(order);
          this.ordersTotal += order.total;
        }
      })
    } else {
      tempDate = temp;
    }
    this.dataSource = new MatTableDataSource<Order>(tempDate);
    this.dataSource.paginator = this.paginator;
}

  clearFilter() {
    this.ordersTotal = 0;
    this.startDate = null;
    this.endDate = null;
    this.zipCode = null;
    this.selectedEmployee = null;
    this.orders.forEach(order => {
      this.ordersTotal += order.total;
    })
    this.dataSource = new MatTableDataSource<Order>(this.orders);
    this.dataSource.paginator = this.paginator;
  }

}
