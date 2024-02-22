import { Injectable, NgModule } from "@angular/core";
import { Dish } from "../Model/Dish";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root',
})

export class MenuService {
    // menu: Dish[] = [
    //     // {
    //     //     "name": "Spaghetti Carbonara",
    //     //     "description": "Pasta with bacon, eggs, and cheese",
    //     //     "price": 12.99
    //     // },
    //     // {
    //     //     "name": "Margherita Pizza",
    //     //     "description": "Tomato, mozzarella, and basil",
    //     //     "price": 9.99
    //     // },
    //     // {
    //     //     "name": "Patate Fritte",
    //     //     "description": "Patate Fritte con olio di olive",
    //     //     "price": 2.49
    //     // },
    //     // {
    //     //     "name": "Lasagna",
    //     //     "description": "Layered pasta with meat, cheese, and sauce",
    //     //     "price": 15.99
    //     // },
    //     // {
    //     //     "name": "Caprese Salad",
    //     //     "description": "Tomatoes, mozzarella, basil, olive oil",
    //     //     "price": 8.49
    //     // },
    //     // {
    //     //     "name": "Risotto ai Funghi",
    //     //     "description": "Risotto with mushrooms and cheese",
    //     //     "price": 11.49
    //     // },
    //     // {
    //     //     "name": "Tiramisu",
    //     //     "description": "Italian dessert made with coffee, ladyfingers, and mascarpone cheese",
    //     //     "price": 7.99
    //     // },
    //     // {
    //     //     "name": "Bruschetta",
    //     //     "description": "Toasted bread topped with tomatoes, garlic, and basil",
    //     //     "price": 6.99
    //     // }
    // ]

    constructor(private http: HttpClient) { }

    getMenuList(): Observable<Dish[]> {
        return this.http.get<Dish[]>('https://localhost:7057/api/Menu')
    }
}
