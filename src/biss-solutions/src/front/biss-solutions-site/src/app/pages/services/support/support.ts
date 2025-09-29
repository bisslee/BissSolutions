import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail } from '../../../components/service-detail/service-detail';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, ServiceDetail],
  templateUrl: './support.html',
  styleUrl: './support.css'
})
export class Support {

}
