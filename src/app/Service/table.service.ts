import { Injectable } from "@angular/core";
import { Table } from "../Model/Table";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class TableService {
    private chosenTableSubject: BehaviorSubject<Table | null> = new BehaviorSubject<Table | null>(null);
    tableChosen$: Observable<Table | null> = this.chosenTableSubject.asObservable();
    
    //tableChosen: Table | undefined;
    // tables: Table[] = [
    //     { tNumber: 1, name: 'Table 1', capacity: 4, status: 'Available' },
    //     { tNumber: 2, name: 'Table 2', capacity: 6, status: 'Occupied' },
    //     { tNumber: 3, name: 'Table 3', capacity: 2, status: 'Available' },
    //     { tNumber: 4, name: 'Table 4', capacity: 8, status: 'Occupied' },
    //     { tNumber: 5, name: 'Table 5', capacity: 4, status: 'Available' },
    //     { tNumber: 6, name: 'Table 6', capacity: 6, status: 'Occupied' },
    //     { tNumber: 7, name: 'Table 7', capacity: 2, status: 'Available' },
    //     { tNumber: 8, name: 'Table 8', capacity: 8, status: 'Available' },
    // ];

    constructor(private http: HttpClient) { }

    setChosenTable(table: any): void {
        this.chosenTableSubject.next(table);
    }

    getChosenTable(): Observable<Table | null> {
        return this.tableChosen$;
    }

    getTableList(): Observable<Table[]> {
        return this.http.get<Table[]>('https://localhost:7057/api/Table')
    }
}
