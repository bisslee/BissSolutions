import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastMessage } from './toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  public messages$: Observable<ToastMessage[]> = this.messagesSubject.asObservable();

  constructor() {}

  showSuccess(message: string, duration: number = 5000): void {
    console.log('ToasterService.showSuccess chamado:', message);
    this.showMessage(message, 'success', duration);
  }

  showError(message: string, duration: number = 7000): void {
    this.showMessage(message, 'error', duration);
  }

  showWarning(message: string, duration: number = 6000): void {
    this.showMessage(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 5000): void {
    this.showMessage(message, 'info', duration);
  }

  private showMessage(message: string, type: ToastMessage['type'], duration: number): void {
    const toastMessage: ToastMessage = {
      id: this.generateId(),
      message,
      type,
      duration
    };

    console.log('Criando toast message:', toastMessage);
    const currentMessages = this.messagesSubject.value;
    console.log('Mensagens atuais:', currentMessages);
    this.messagesSubject.next([...currentMessages, toastMessage]);
    console.log('Nova lista de mensagens:', this.messagesSubject.value);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeMessage(toastMessage.id);
      }, duration);
    }
  }

  removeMessage(id: string): void {
    const currentMessages = this.messagesSubject.value;
    const filteredMessages = currentMessages.filter(msg => msg.id !== id);
    this.messagesSubject.next(filteredMessages);
  }

  clearAll(): void {
    this.messagesSubject.next([]);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
