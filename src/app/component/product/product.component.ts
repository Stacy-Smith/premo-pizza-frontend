import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.services';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products = [];
  
  

  constructor(private productService: ProductService ) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }
  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
}
