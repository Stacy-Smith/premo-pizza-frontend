import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { EmployeeService } from './employee.service';
import { OrderService } from './orders.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(private orderService: OrderService,
              private employeeService: EmployeeService,
              private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
    let obsArray = [this.orderService.getAll(), this.employeeService.getAll(),this.productService.getAll()]; 
    return forkJoin(obsArray);
  }
}
