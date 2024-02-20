import { Component, OnInit } from '@angular/core';
import { Table } from '../Model/Table';
import { TableService } from '../Service/table.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderComponent } from "../order/order.component";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, RouterModule, OrderComponent]
})
export class HomeComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableService: TableService, private router: Router) { }

  ngOnInit() {
    this.tables = this.tableService.tables;
  }

  choosedTable(tableId: number) {
    const tableChosen = this.tables.find(table => table.tNumber === tableId);
    this.tableService.tableChosen = tableChosen;
  }
}

