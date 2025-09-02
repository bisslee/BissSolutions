import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-float.component.html',
  styleUrls: ['./whatsapp-float.component.css']
})
export class WhatsappFloatComponent {
  @Input() phoneNumber: string = '5511952729399';
  @Input() message: string = 'Olá! Gostaria de saber mais sobre os serviços da Biss Solutions.';

  get whatsappUrl(): string {
    const encodedMessage = encodeURIComponent(this.message);
    return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
  }

  openWhatsApp(): void {
    window.open(this.whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}
