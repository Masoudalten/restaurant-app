import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Order } from '../Model/Order';
import { OrderService } from '../Service/order.service';
import { RouterLink } from '@angular/router';
import { TableService } from '../Service/table.service';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../Service/event.service';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
  providers: [OrderService, TableService]
})
export class ListOrdersComponent implements OnInit, AfterViewInit {
  orders: any[] = [];
  isLoading: boolean = false;

  constructor(private orderService: OrderService, private tableService: TableService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadOrders();
  }
  
  ngAfterViewInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
      (error) => {
        console.log('Error loading orders', error);
        this.isLoading = false;
      }
    )
  }

  removeOrder(orderId: number) {
    this.tableService.changeStatusAvailable(orderId);
    this.orderService.removeOrder(orderId).subscribe(() => {
      this.loadOrders();
    });
  }

  checkout(orderId: number) {
    const checkoutOrder = this.orders.filter(order => order.orderId === orderId);
    this.orderService.storeCheckoutOrder(checkoutOrder);
    this.removeOrder(orderId);
  }
}
