import { Customer } from "./customer";
import { Employee } from "./employee";

export class Order {
    orderId?: number;
    customer: Customer;
    employee: Employee;
    timestamp: Date;
    subtotal: number;
    discount: number;
    total: number;
}