import { Injectable } from "@angular/core";
import { Order } from "../Model/Order";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    orders: Order[] = [];
    selectedOrder: Order[] = [];

    constructor() { }

    addOrder(order: Order): void {
        this.orders.push(order);
    }

    getOrders(): Order[] {
        return this.orders;
    }

    getOrdersForTable(tableNumber: number): Order[] {
        return this.orders.filter(order => order.tNumber === tableNumber);
    }

    removeOrder(orderIndex: number): void {
        this.orders.splice(orderIndex, 1);
    }

    updateOrder(orderIndex: number, updatedOrder: Order): void {
        this.orders[orderIndex] = updatedOrder;
    }

    getTotal(order: Order[]): number {
        const total = order.reduce((acc: number, item: { price: number; }) => {
            return acc + item.price;
        }, 0);
        return parseFloat(total.toFixed(2));
    }
}
