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
      const total = this.order[0].reduce((acc: number, item: { price: number; }) => {
        return acc + item.price;
      }, 0);
      this.total = total.toFixed(2);
    }

  }
}

