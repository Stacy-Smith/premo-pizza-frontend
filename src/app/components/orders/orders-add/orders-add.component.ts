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
  order: Order = {
    customer: {
      id: null,
      name: null,
      address: null,
      phoneNumber: null,
      zipCode: null
    },
    employee: {
      employeeId: null,
      name: null,
      address: null,
      startDate: null,
      endDate: null,
      taxId: null,
      active: false
    },
    timestamp: new Date,
    subtotal: 0.00,
    discount: 0.00,
    total: 0.00
  };
  submitted = false;

  selectedProduct: Product = null;
  firstProduct: Product = null;
  currentNumber = '0';
  firstOperand = null;
  operator = null;
  quantity = 1;
  waitForSecondNumber = false;

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

  saveOrder(): void {
    console.log(this.order);
    console.log(this.orderProducts);
    // send create for order object
    // subscribe -> assign orderid to all orderproducts
    // make creates for each orderproduct
    // send them together in concat
  }

  public getProduct(product: Product){
    if(this.waitForSecondNumber)
    {
      this.currentNumber = String(product.price);
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = String(product.price): this.currentNumber += String(product.price);
    }
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }

  public getNumber(v: string){
    console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
    }
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  public getOperation(op: string){
    console.log(op);

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);
      this.firstProduct = this.selectedProduct;
    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
    console.log(this.firstProduct);
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
        // check if product is there, if yes += qty
      //add item qty=1
      return this.firstOperand += secondOp; 
      case '-': 
      // remove item
      return this.firstOperand -= secondOp; 
      case '*': 
      // check if product is there, if yes += qty
      // get quantity & push new orderproduct
      return this.firstOperand *= secondOp; 
      case '/': 
      //discount
      return this.firstOperand /= secondOp; 
      case '=':
        //update totals
      return secondOp;
    }
    //update total
  }

  public clear(){
    this.selectedProduct = null;
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.quantity = 1;
    this.waitForSecondNumber = false;
    this.orderProducts = [];
    this.order = {
        customer: {
      id: null,
      name: null,
      address: null,
      phoneNumber: null,
      zipCode: null
    },
      employee: {
      employeeId: null,
      name: null,
      address: null,
      startDate: null,
      endDate: null,
      taxId: null,
      active: false
    },
    timestamp: new Date,
    subtotal: 0.00,
    discount: 0.00,
    total: 0.00
  };
  }
}
