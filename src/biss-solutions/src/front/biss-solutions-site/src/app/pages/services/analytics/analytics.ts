import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail } from '../../../components/service-detail/service-detail';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ServiceDetail],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics {

}
