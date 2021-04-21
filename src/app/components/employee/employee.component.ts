import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees = [];
  currentEmployee = null;
  currentIndex = -1;
  active = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll()
      .subscribe(data => {
        console.log(data);
        this.employees = data;
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveEmployees();
    this.currentEmployee = null;
    this.currentIndex = -1;
  }

  setActiveEmployee(employee, index): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeAllEmployees(): void {
    this.employeeService.deleteAll()
      .subscribe(response => {
        console.log(response);
        this.retrieveEmployees();
      },
      error => {
        console.log(error);
      });
  }

  activeEmployees(active): void {
    console.log(this.employees)
    if (active) {
      this.employeeService.findByStatus("active")
        .subscribe(data => {
          console.log(data);
          this.employees = data;
        },
        error => {
          console.log(error);
        });
    }
    else {
      this.employeeService.findByStatus("inactive")
        .subscribe(data => {
          console.log(data);
          this.employees = data;
        },
        error => {
          console.log(error);
        });
    }
  }

}
