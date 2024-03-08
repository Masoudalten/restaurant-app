import { Injectable } from "@angular/core";
import { Order } from "../Model/Order";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, tap } from "rxjs";
import { EventService } from "./event.service";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    orders: any[] = [];
    checkoutOrder: Order[] = [];

    constructor(private http: HttpClient, private eventService: EventService) { }

    addOrder(order: Order[]): Observable<Order[]> {
        this.orders.push(order);
        const total = this.getTotal(order);
        let params = new HttpParams();
        params = params.set('total', total.toString());
        return this.http.post<Order[]>('https://localhost:7057/api/Order', order, { params: params })
    }

    getOrders(): Observable<any[]> {
        return this.http.get<any[]>('https://localhost:7057/api/Order').pipe(
            tap(data => {
                this.orders = data;
            }),
            catchError(error => {
                console.error('Error fetching table data:', error);
                throw error;
            })
        );
    }

    getOrdersForTable(tableNumber: number): Order[] {
        return this.orders.filter(order => order.tNumber === tableNumber);
    }

    removeOrder(orderId: number): Observable<any[]> {
        return this.http.delete<any[]>(`https://localhost:7057/api/Order/${orderId}`);
    }

    updateOrder(orderIndex: number, updatedOrder: Order): void {
        this.orders[orderIndex] = updatedOrder;
    }

    getTotal(order: any[]): number {
        const total = order.reduce((acc: number, item: { price: number; }) => {
            return acc + item.price;
        }, 0);
        return parseFloat(total.toFixed(2));
    }

    storeCheckoutOrder(data: Order[]) {
        this.checkoutOrder = data;
        this.eventService.emitCheckoutOrderChanged(data);
    }

    retrieveCheckoutOrder(): Order[] {
        return this.checkoutOrder;
    }

}
