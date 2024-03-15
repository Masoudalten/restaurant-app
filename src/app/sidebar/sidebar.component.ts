import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() menuToggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuToggle: boolean = false;
  constructor(private router: Router) { }

  isActive(item: string): boolean {
    return this.router.url.includes(item.toLocaleLowerCase());
  }

  onMenuToggle() {
    this.menuToggle = !this.menuToggle;
    this.menuToggleChange.emit(this.menuToggle);
  }
}
