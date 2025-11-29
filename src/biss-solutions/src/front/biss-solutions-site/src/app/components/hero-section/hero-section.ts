import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() backgroundImage: string = '/images/about/about.jpg';
  @Input() height: string = '40vh'; // Altura padrão
}
