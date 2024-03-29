import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent,]
})
export class AppComponent {
  title = 'ristorant-app';
  menuToggle: boolean = false;
  handleMenuToggle(menuToggle: boolean) {
    this.menuToggle = menuToggle;
  }

}
