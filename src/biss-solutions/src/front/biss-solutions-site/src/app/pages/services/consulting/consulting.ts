import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail } from '../../../components/service-detail/service-detail';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-consulting',
  standalone: true,
  imports: [CommonModule, ServiceDetail, BreadcrumbComponent],
  templateUrl: './consulting.html',
  styleUrl: './consulting.css'
})
export class Consulting implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('services/consulting'));
  }

}
