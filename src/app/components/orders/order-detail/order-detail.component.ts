import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute) { }

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

}
