import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  submitted = false;
  employee = {
    name: '',
    address: '',
    startDate: null,
    endDate: null,
    taxId: null,
    active: true
  }
 

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  saveEmployee(): void {
    const data = {
      name: this.employee.name,
      address: this.employee.address,
      startDate: this.employee.startDate,
      endDate: this.employee.endDate,
      taxId: this.employee.taxId,
      active: this.employee.active
    };

    this.employeeService.create(data)
      .subscribe(response => {
        console.log(response); 
        this.submitted = true;
      }, 
      error => {
        console.log(error);
      });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      name: '',
      address: '',
      startDate: null,
      endDate: null,
      taxId: null,
      active: true
    };
  }

}
