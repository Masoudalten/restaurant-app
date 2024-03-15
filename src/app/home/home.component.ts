import { Component, OnInit } from '@angular/core';
import { Table } from '../Model/Table';
import { TableService } from '../Service/table.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderComponent } from "../order/order.component";
import { OrderService } from '../Service/order.service';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../Service/event.service';
import { Order } from '../Model/Order';
import { TooltipDirective } from '../Directives/tooltip.directive';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, RouterModule, OrderComponent, HttpClientModule, TooltipDirective],
  providers: [OrderService, TableService]
})

export class HomeComponent implements OnInit {
  tables: Table[] = [];
  orders: Order[] = [];
  order: Order | undefined;
  tooltipContent: string = "hello world";

  constructor(private tableService: TableService, private eventService: EventService, private orderService: OrderService) { }

  ngOnInit() {
    this.loadTables();
    this.loadOrders();
  }

  loadTables() {
    this.tableService.getTableList().subscribe((tables) => {
      this.tables = tables;
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    },
      (error) => {
        console.log('Error loading orders', error);
      }
    )
  }

  selectTable(tableId: number) {
    const selectedTable = this.tables.find(table => table.tNumber === tableId);
    if (selectedTable !== undefined) {
      this.eventService.emitCheckSelectedTableChange(selectedTable);
    }
  }
}