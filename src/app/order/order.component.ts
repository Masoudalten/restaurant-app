import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Dish } from '../Model/Dish';
import { MenuService } from '../Service/menu.service';
import { CommonModule } from '@angular/common';
import { Table } from '../Model/Table';
import { TableService } from '../Service/table.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Service/order.service';
import { RouterModule } from '@angular/router';
import { MenuServiceModule } from '../menu-service.module';
import { TableServiceModule } from '../table-service.module';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuServiceModule, TableServiceModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  selectedTableNumber: Table | undefined;
  tables: Table[] = [];
  menu: Dish[] = [];
  availableTables: Table[] = [];
  order: any[] = [];
  selectedMeal: string = '';
  selectedPrice: number = 0;
  //selectedTable: number | undefined;
  quantity: number = 1;
  showOrderSummary: boolean = false;
  chosenTable: Table | undefined;

  constructor(private menuService: MenuService, private tableService: TableService, private orderService: OrderService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
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

  placeOrder() {
    this.order.forEach(orderItem => {
      this.orderService.addOrder(orderItem)
    })
    this.order = [];
    this.showOrderSummary = false;
  }
}
