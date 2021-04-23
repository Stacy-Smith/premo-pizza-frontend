import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/orders';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrderService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-orders',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.scss']
})
export class EmployeeOrdersComponent implements OnInit, AfterViewInit {

  employee = null;
  displayedColumns: string[] = ['orderId', 'date', 'zipcode', 'subtotal', 'discount', 'total'];
  orders: Order[] = [];
  ordersTotal = 0;
  dataSource: MatTableDataSource<Order>;
  pipe: DatePipe;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});

  constructor(private employeeService: EmployeeService,
    private orderService: OrderService,
    private route: ActivatedRoute) {
      this.pipe = new DatePipe('en');
     }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.retrieveData();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = (data, filter) =>{
      if (this.fromDate && this.toDate) {
        return data.timestamp >= this.fromDate && data.timestamp <= this.toDate;
      }
      return true;
    }
  }

  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  applyFilter() {
    let temp = [];
    this.ordersTotal = 0;
    this.orders.forEach(order => {
      if((new Date(order.timestamp) >= this.filterForm.get('fromDate').value) && 
         (new Date(order.timestamp) <= this.filterForm.get('toDate').value)) {
        temp.push(order);
        this.ordersTotal += order.total;
      }
    })
    this.dataSource = new MatTableDataSource<Order>(temp);
    this.dataSource.paginator = this.paginator;
  }

  clearFilter(){
    this.ordersTotal = 0;
    this.orders.forEach(order => {
      this.ordersTotal += order.total;
    })
    this.dataSource = new MatTableDataSource<Order>(this.orders);
    this.dataSource.paginator = this.paginator;
  }

  retrieveData(): void {
    this.employeeService.get(this.route.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.employee = data;
        this.orderService.getAll()
          .subscribe(data => {
            data.forEach(item => {
              if(item.employee.id == this.employee.id){
                this.orders.push(item);
                this.ordersTotal += item.total;
              }
              this.dataSource = new MatTableDataSource<Order>(this.orders);
            })
          },
          error => {
            console.log(error);
          })
      },
      error => {
        console.log(error);
      })
  }
  
}
