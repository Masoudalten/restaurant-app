import { Injectable } from "@angular/core";
import { Table } from "../Model/Table";
import { Observable, catchError, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class TableService {
    tables: Table[] = [];
    selectedTable!: Table;

    constructor(private http: HttpClient) { }

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

    setSelectTable(tableId: number) {
        const choosedTable = this.tables.find((table) => table.tNumber === tableId);
        if (choosedTable)
            this.selectedTable = choosedTable;
    }
}
