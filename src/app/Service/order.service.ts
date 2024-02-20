import { Injectable } from "@angular/core";
import { Order } from "../Model/Order";


@Injectable({
    providedIn: 'root',
})

export class OrderService {
    order: any[] = [];
    selectedOrder: Order[] = [];
}
