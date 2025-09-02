import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, MenuItem } from '../menu/menu.component';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent, SocialComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() menuItemClick = new EventEmitter<MenuItem>();

  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuItemClick(item: MenuItem): void {
    this.menuItemClick.emit(item);
    this.isMenuOpen = false; // Fecha o menu mobile após clicar
  }
}
