import { Component, OnInit } from '@angular/core';
import { Table } from '../Model/Table';
import { TableService } from '../Service/table.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderComponent } from "../order/order.component";
import { TableServiceModule } from '../table-service.module';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, RouterModule, OrderComponent, TableServiceModule]
})
export class HomeComponent implements OnInit {
  tables: Table[] = [];
  selectedTable: Table | undefined;

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.tableService.getTableList().subscribe((tables) => {
      this.tables = tables;
    });
  }

  selectTable(tableId: number) {
    this.selectedTable = this.tables.find(table => table.tNumber === tableId);
    //console.log('Selected Table:', this.selectedTable); // Debugging statement
  }
}