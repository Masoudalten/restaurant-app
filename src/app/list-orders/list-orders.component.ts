import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../Model/Order';
import { OrderService } from '../Service/order.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: Order[] = [];

  constructor(private orderService: OrderService) { }
  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(){
    this.orders = this.orderService.getOrders();
  }
  removeOrder(orderId: number) {
    this.orderService.removeOrder(orderId);
    this.loadOrders();
  }

  checkout(orderId: number) {
    this.selectedOrder = this.orders.filter(order => order[0].tNumber === orderId);
    this.orderService.selectedOrder = this.selectedOrder;
    this.removeOrder(orderId);
  }
}
