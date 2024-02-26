import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../Model/Order';
import { OrderService } from '../Service/order.service';
import { RouterLink } from '@angular/router';
import { TableServiceModule } from '../table-service.module';


@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, TableServiceModule],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit {
  orders: any[] = [];
  checkoutOrder: Order[] = [];

  constructor(private orderService: OrderService) { }
  ngOnInit() {
    console.log(this.orderService.orders)
    this.loadOrders();
  }

  loadOrders() {
    this.orders = this.orderService.getOrders();
  }
  removeOrder(orderId: number) {
    console.log(orderId)

    this.orderService.removeOrder(orderId);
    this.loadOrders();
  }

  checkout(orderId: number) {
     this.checkoutOrder = this.orders.filter(order => order[0].tNumber === orderId);
    this.orderService.checkoutOrder = this.checkoutOrder;
    console.log(this.checkoutOrder)
    this.removeOrder(orderId);
  }
}
