import { Order } from "./orders";
import { Product } from "./product";

export class OrderProduct {
    orderProductId?: number;
    product: Product;
    order: Order;
    quantity: number;
}