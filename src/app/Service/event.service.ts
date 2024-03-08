import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { Order } from '../Model/Order';
import { Table } from '../Model/Table';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private checkoutOrderChangedSource = new BehaviorSubject<Order[]>([]);
    checkoutOrderChanged = this.checkoutOrderChangedSource.asObservable();

    private selectedTableChangeSource = new BehaviorSubject<Table | null>(null);
    selectedTableChange = this.selectedTableChangeSource.asObservable().pipe(
        catchError(error => {
            console.error('Error in selectedTableChange observable:', error);
            throw error;
        })
    );

    constructor() { }

    emitCheckoutOrderChanged(data: Order[]) {
        this.checkoutOrderChangedSource.next(data);
    }

    emitCheckSelectedTableChange(data: Table) {
        this.selectedTableChangeSource.next(data);
    }

}