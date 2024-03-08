import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Dish } from '../Model/Dish';
import { MenuService } from '../Service/menu.service';
import { CommonModule } from '@angular/common';
import { Table } from '../Model/Table';
import { TableService } from '../Service/table.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Service/order.service';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../Service/event.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  providers: [OrderService, TableService, MenuService]
})
export class OrderComponent implements OnInit, OnDestroy {
  selectedTableNumber: number | undefined;
  tables: Table[] = [];
  menu: Dish[] = [];
  availableTables: Table[] = [];
  order: any[] = [];
  selectedMeal: string = '';
  selectedPrice: number = 0;
  selectedTable: Table | undefined;
  quantity: number = 1;
  showOrderSummary: boolean = false;
  chosenTable: Table | undefined;
  private tableChangeSubscription: Subscription | undefined;

  constructor(private menuService: MenuService, private tableService: TableService, private orderService: OrderService, private cdr: ChangeDetectorRef, private eventService: EventService) { }

  ngOnInit() {

    this.tableChangeSubscription = this.eventService.selectedTableChange.subscribe((data: Table | null) => {
      if (data !== null) {
        this.selectedTable = data;
        this.selectedTableNumber = data.tNumber;
      }
    })
    console.log(this.selectedTable);
    this.tableService.getTableList().subscribe((tables) => {
      this.tables = tables;
    });

    this.menuService.getMenuList().subscribe((data) => {
      this.menu = data;
    })
  }


  handleMealSelection() {
    const selectedDish = this.menu.find(dish => dish.nome === this.selectedMeal);
    if (selectedDish) {
      this.selectedPrice = selectedDish.prezzo;
    }
  }

  addItem() {
    this.handleMealSelection();
    const orderItem = {
      tNumber: this.selectedTableNumber,
      name: this.selectedMeal,
      quantity: this.quantity,
      price: this.selectedPrice * this.quantity
    };
    const sameTable = this.order.find(order => order[0].tNumber === this.selectedTableNumber);

    if (sameTable) {
      sameTable.push(orderItem);
    } else {
      this.order.push([orderItem]);
    }
    this.showOrderSummary = true;
  }

  placeOrder(tableId: number) {
    this.order.forEach(orderItem => {
      this.orderService.addOrder(orderItem).subscribe();
    })
    this.order = [];
    this.showOrderSummary = false;
    this.tableService.changeStatusOccupied(tableId);
  }

  ngOnDestroy() {
    if (this.tableChangeSubscription) {
      this.tableChangeSubscription.unsubscribe();
    }
  }
}
