import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tables', pathMatch: 'full' },
    { path: 'tables', component: HomeComponent },
    { path: 'new-order', component: OrderComponent },
    { path: 'orders-list', component: ListOrdersComponent },
    { path: 'checkout', component: CheckoutComponent },

];

