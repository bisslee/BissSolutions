import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail } from '../../../components/service-detail/service-detail';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [CommonModule, ServiceDetail],
  templateUrl: './development.html',
  styleUrl: './development.css'
})
export class Development {

}
