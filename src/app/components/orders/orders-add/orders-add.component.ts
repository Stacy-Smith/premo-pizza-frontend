import { Component, OnInit } from '@angular/core';
import { concat, forkJoin } from 'rxjs';
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
  productMult = 0;
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
    this.orderService.create(this.order)
    // subscribe -> assign orderid to all orderproducts
      .subscribe(data => {
        this.order = data;
        let multiCreate = [];
        // make creates for each orderproduct
        this.orderProducts.forEach(orderProduct => {
          orderProduct.order = this.order;
          multiCreate.push(this.orderProductService.create(orderProduct));
        })
         // send them together in concat
        forkJoin(multiCreate).subscribe(data => {
          console.log(data);
          this.submitted = true;
        }, error => {
          console.log(error);
        })
      })
      
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
    let included = false;
    this.firstProduct = this.selectedProduct;
    if((op == "+" || op == "=") && this.operator == null){
      let orderProduct: OrderProduct = {
        product: this.selectedProduct,
        order: null,
        quantity: 1
      }
      this.orderProducts.push(orderProduct);
    }
    if( op == "=" && (this.operator != null) && ((this.operator != "*") && (this.operator != "/"))){
      this.orderProducts.forEach(orderProduct => {
        if(orderProduct.product.productId == this.firstProduct.productId){
          orderProduct.quantity += 1;
          included = true;
        }
      });

    if(!included){
      let orderProduct: OrderProduct = {
        product: this.selectedProduct,
        order: null,
        quantity: 1
      }
      this.orderProducts.push(orderProduct);
    }
    }
    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);
    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
    if (op == "="){
      this.order.subtotal = 0;
      this.orderProducts.forEach(orderProduct => {
        this.order.subtotal += (orderProduct.product.price * orderProduct.quantity);
      })
      this.order.total = this.order.subtotal - this.order.discount;
        console.log(this.order.subtotal);
        console.log(this.order.total);
    }
  }

  private doCalculation(op , secondOp){
    let included = false;
    switch (op){
      case '+':
        // check if product is there, if yes += qty 1
        
      // check if product is there, if yes += qty
      console.log(`First Product: ${JSON.stringify(this.firstProduct)}`);
      console.log(`Order Products Array: ${JSON.stringify(this.orderProducts)}`);
        return this.firstOperand += secondOp; 
      case '-': 
      // remove item
      
      return this.firstOperand -= secondOp; 
      case '*': 
      // check if product is there, if yes += qty
        this.orderProducts.forEach(orderProduct => {
          if(orderProduct.product.productId == this.firstProduct.productId){
            orderProduct.quantity += Number(this.currentNumber);
            included = true;
          }
        });
        // get quantity & push new orderproduct
        if(!included){
          let orderProduct: OrderProduct = {
            product: this.selectedProduct,
            order: null,
            quantity: Number(this.currentNumber)
          }
          this.orderProducts.push(orderProduct);
        }
        console.log(`First Product: ${JSON.stringify(this.firstProduct)}`);
        console.log(`Order Products Array: ${JSON.stringify(this.orderProducts)}`);
        this.productMult = this.selectedProduct.price * secondOp;
      return this.productMult; 
      case '/': 
      //discount
      this.order.discount = secondOp;
      return this.firstOperand; 
      case '=':

      return secondOp;
    }
    //update total
    console.log(`First Product: ${JSON.stringify(this.firstProduct)}`);
    console.log(`Order Products Array: ${JSON.stringify(this.orderProducts)}`);
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
