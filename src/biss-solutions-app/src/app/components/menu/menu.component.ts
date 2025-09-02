import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MenuItem {
  label: string;
  route: string;
  children?: MenuItem[];
}

export type MenuStyle = 'header' | 'footer';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Empresa', route: '/empresa' },
    { label: 'Clientes', route: '/clients' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Serviços', route: '/servicos' },
    { label: 'Sobre', route: '/sobre' },
    // { label: 'Notícias', route: '/noticias' },
    // { label: 'Blog', route: '/blog' },
    { label: 'Contato', route: '/contato' }
  ];

  @Input() isMenuOpen: boolean = false;
  @Input() style: MenuStyle = 'header';
  @Output() menuItemClick = new EventEmitter<MenuItem>();

  ngOnInit() {
    console.log('MenuComponent initialized with style:', this.style);
  }

  onMenuItemClick(item: MenuItem): void {
    this.menuItemClick.emit(item);
  }
}
