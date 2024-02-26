import { Injectable, NgModule } from "@angular/core";
import { Dish } from "../Model/Dish";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root',
})

export class MenuService {

    constructor(private http: HttpClient) { }

    getMenuList(): Observable<Dish[]> {
        return this.http.get<Dish[]>('https://localhost:7057/api/Menu')
    }
}
