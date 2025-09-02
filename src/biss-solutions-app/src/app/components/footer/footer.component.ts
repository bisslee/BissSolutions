import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SocialComponent } from '../social/social.component';
import { MenuComponent, MenuItem } from '../menu/menu.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, SocialComponent, MenuComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  onMenuItemClick(item: MenuItem): void {
    // Aqui você pode adicionar lógica adicional se necessário
    console.log('Footer menu item clicked:', item);
  }
}
