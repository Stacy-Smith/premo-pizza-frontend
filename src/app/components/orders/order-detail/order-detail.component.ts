import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OrderProduct } from 'src/app/models/orderproduct';
import { Order } from 'src/app/models/orders';
import { OrderproductService } from 'src/app/services/orderproduct.service';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  orderProducts: OrderProduct[] = [];

  constructor(private orderService: OrderService,
              private orderProductService: OrderproductService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrder(this.route.snapshot.paramMap.get('id'));
    this.retrieveOrderProducts();
  }

  retrieveOrderProducts(): void {
    this.orderProductService.getAll()
      .subscribe(data => {
        data.forEach(orderProd => {
          if(this.order.orderId == orderProd.order.orderId){
            this.orderProducts.push(orderProd);
          }
          console.log(this.orderProducts);
        });
      }, error => {
        console.log(error);
      });
  }

  getOrder(id): void {
    this.orderService.get(id)
      .subscribe(data => {
        this.order = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
  deleteOrder(): void {
    let mult = [];
    if (this.orderProducts.length > 0) {
      this.orderProducts.forEach(orderProduct => {
        mult.push(this.orderProductService.delete(orderProduct.orderProductId))
      })
      forkJoin(mult).subscribe(data =>{
        this.orderService.delete(this.order.orderId)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/orders'])
      })
          },
          error => {
            console.log(error);
          });
    } else {
      this.orderService.delete(this.order.orderId)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/orders'])
      },
      error => {
        console.log(error);
      });
    } 
  }
}
