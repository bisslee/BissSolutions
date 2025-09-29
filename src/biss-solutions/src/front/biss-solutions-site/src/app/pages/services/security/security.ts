import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail } from '../../../components/service-detail/service-detail';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, ServiceDetail],
  templateUrl: './security.html',
  styleUrl: './security.css'
})
export class Security {

}
