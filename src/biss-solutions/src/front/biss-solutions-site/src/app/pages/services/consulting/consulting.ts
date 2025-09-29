import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail } from '../../../components/service-detail/service-detail';

@Component({
  selector: 'app-consulting',
  standalone: true,
  imports: [CommonModule, ServiceDetail],
  templateUrl: './consulting.html',
  styleUrl: './consulting.css'
})
export class Consulting {

}
