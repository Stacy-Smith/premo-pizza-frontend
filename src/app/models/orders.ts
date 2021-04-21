export class Order {
    orderId?: number;
    customer: object;
    employee: object;
    timestamp: Date;
    subtotal: number;
    discount: number;
    total: number;
}