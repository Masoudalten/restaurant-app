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

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getTableList().subscribe({
      next: (tables: Table[]) => {
        this.tables = tables;
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  choosedTable(tableId: number) {
    const tableChosen = this.tables.find(table => table.tNumber === tableId);
    //this.tableService.tableChosen = tableChosen;
    this.tableService.setChosenTable(tableChosen);
    console.log(this.tableService.getChosenTable())
  }
}

