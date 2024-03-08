export interface Order {
    orderId: number;
    orderItems: [{
        tNumber: number;
        name: string;
        price: number;
        quantity: number;
    }]
    time: string;
    total: number;
}