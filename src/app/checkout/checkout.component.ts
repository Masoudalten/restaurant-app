import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { OrderService } from '../Service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Order } from '../Model/Order';
import { EventService } from '../Service/event.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [OrderService]
})
export class CheckoutComponent implements OnInit {

  //checkoutOrder = this.orderService.retrieveCheckoutOrder();
  checkoutOrder: Order[] = [];
  total: number = 0;
  tableNumber: number = 0;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.checkoutOrderChanged.subscribe((data: Order[]) => {
      this.checkoutOrder = data;
      if (this.checkoutOrder && this.checkoutOrder.length > 0) {
        const firstOrder = this.checkoutOrder[0];
        this.total = firstOrder.total;
        if (firstOrder.orderItems && firstOrder.orderItems.length > 0) {
          this.tableNumber = firstOrder.orderItems[0].tNumber;
        }
      }
    });
  }
}
