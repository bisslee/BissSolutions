import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css'
})
export class ServiceCard {
  @Input() imagem: string = '';
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() itens: string[] = [];
  @Input() link: string = '';
}
