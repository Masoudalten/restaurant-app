import { Component, OnInit } from '@angular/core';
import { Order } from '../Model/Order';
import { OrderService } from '../Service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  order: any[] = [];
  total: number = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.order = this.orderService.selectedOrder;
    this.getTotal();
  }

  getTotal() {
    if (this.order.length > 0) {
      this.total = this.orderService.getTotal(this.order[0]);
    } else {
      console.log("Order does not exist")
    }
  }
}
