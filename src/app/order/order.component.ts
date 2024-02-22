import { Component, OnInit } from '@angular/core';
import { Dish } from '../Model/Dish';
import { MenuService } from '../Service/menu.service';
import { CommonModule } from '@angular/common';
import { Table } from '../Model/Table';
import { TableService } from '../Service/table.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Service/order.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MenuServiceModule } from '../menu-service.module';
import { TableServiceModule } from '../table-service.module';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuServiceModule, TableServiceModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  tables: Table[] = [];
  menu: Dish[] = [];
  availableTables: Table[] = [];
  order: any[] = [];
  selectedMeal: string = '';
  selectedPrice: number = 0;
  selectedTable: number | undefined;
  quantity: number = 1;
  showOrderSummary: boolean = false;
  chosenTable: Table | undefined;

  constructor(private menuService: MenuService, private tableService: TableService, private orderService: OrderService, private httpModule: HttpClientModule) { }

  ngOnInit() {
    this.availableTables = this.tables.filter(table => table.status === 'Available');
    //this.menu = this.menuService.menu;
    console.log(this.tableService.getChosenTable())
    //this.chosenTable = this.tableService.tableChosen;
    this.selectedTable = this.chosenTable?.tNumber;

    this.menuService.getMenuList().subscribe((data) => {
      this.menu = data;
      console.log(this.menu)
    })

    this.tableService.getTableList().subscribe({
      next: (tables: Table[]) => {
        this.tables = tables;
      },
      error: (error) => {
        console.error(error)
      }
    });
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
    this.orderService.addOrder(this.order[0]);
    this.order = [];
    this.showOrderSummary = false;
  }
}
