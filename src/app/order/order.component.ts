import { Component, OnInit } from '@angular/core';
import { Dish } from '../Model/Dish';
import { MenuService } from '../Service/menu.service';
import { CommonModule } from '@angular/common';
import { Table } from '../Model/Table';
import { TableService } from '../Service/table.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Service/order.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  menu: Dish[] = [];
  availableTables: Table[] = [];
  order: any[] = [];
  selectedMeal: string = '';
  selectedPrice: number = 0;
  selectedTable: number | undefined;
  quantity: number = 1;
  showOrderSummary: boolean = false;
  chosenTable: Table | null | undefined;

  constructor(private menuService: MenuService, private tableService: TableService, private orderService: OrderService) { }

  ngOnInit() {
    this.availableTables = this.tableService.tables.filter(table => table.status === 'Available');
    this.menu = this.menuService.menu;
    this.chosenTable = this.tableService.tableChosen;
    this.selectedTable = this.chosenTable?.tNumber;
  }

  handleMealSelection() {
    const selectedDish = this.menu.find(dish => dish.name === this.selectedMeal);
    if (selectedDish) {
      this.selectedPrice = selectedDish.price;
    }
  }

  addItem() {
    this.handleMealSelection();
    const orderItem = {
      tNumber: this.selectedTable,
      name: this.selectedMeal,
      quantity: this.quantity,
      price: this.selectedPrice * this.quantity
    };
    const sameTable = this.order.find(order => order[0]?.tNumber === this.selectedTable);

    if (sameTable) {
      sameTable.push(orderItem);
    } else {
      this.order.push([orderItem]);
    }
    this.showOrderSummary = true;
  }

  placeOrder() {
    console.log(this.order)
    this.orderService.order.push(this.order[0]);
    console.log(this.orderService.order);
  }
}
