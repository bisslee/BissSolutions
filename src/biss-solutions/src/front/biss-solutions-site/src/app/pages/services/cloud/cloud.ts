import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail } from '../../../components/service-detail/service-detail';

@Component({
  selector: 'app-cloud',
  standalone: true,
  imports: [CommonModule, ServiceDetail],
  templateUrl: './cloud.html',
  styleUrl: './cloud.css'
})
export class Cloud {

}
