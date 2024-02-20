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
    this.orders = this.orderService.order
  }
  removeOrder(orderId: number) {
    this.orders = this.orders.filter(order => order[0].tNumber !== orderId);
  }

  checkout(orderId: number) {
    this.selectedOrder = this.orders.filter(order => order[0].tNumber === orderId);
    this.orderService.selectedOrder = this.selectedOrder;
  }
}
