import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService } from './toaster.service';
import { Subscription } from 'rxjs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit, OnDestroy {
  messages: ToastMessage[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.subscription = this.toasterService.messages$.subscribe(
      messages => this.messages = messages
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMessage(id: string) {
    this.toasterService.removeMessage(id);
  }
}
