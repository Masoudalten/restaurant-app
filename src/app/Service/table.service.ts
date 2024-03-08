import { Injectable } from "@angular/core";
import { Table } from "../Model/Table";
import { Observable, catchError, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OrderService } from "./order.service";

@Injectable({
    providedIn: 'root',
})

export class TableService {
    tables: Table[] = [];
    selectedTable!: Table;

    constructor(private http: HttpClient, private orderService: OrderService) { }

    getTableList(): Observable<Table[]> {
        return this.http.get<Table[]>('https://localhost:7057/api/Table').pipe(
            tap(data => {
                this.tables = data;
            }),
            catchError(error => {
                console.error('Error fetching table data:', error);
                throw error;
            })
        );
    }

    changeStatusOccupied(tableId: number) {
        this.updateTable(tableId, 'Occupied').subscribe();
    }

    changeStatusAvailable(tableId: number) {
        this.orderService.getOrders().subscribe((orders) => {
            console.log(orders);
            const selectedOrder = orders.find(order => order.orderId === tableId);
            console.log(selectedOrder);
            const tableNumber = selectedOrder.orderItems[0].tNumber
            this.getTableList().subscribe(() => {
                const updatedTable = { ...this.tables[tableNumber] };
                this.updateTable(tableNumber, 'Available').subscribe();
            });
        })
    }

    updateTable(tableId: number, newStatus: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.put(`https://localhost:7057/api/Table/${tableId}?status=${newStatus}`, { headers }).pipe(
            catchError(error => {
                console.error(error);
                throw error;
            })
        );
    }

    setSelectTable(tableId: number) {
        const choosedTable = this.tables.find((table) => table.tNumber === tableId);
        if (choosedTable)
            this.selectedTable = choosedTable;
    }
}
