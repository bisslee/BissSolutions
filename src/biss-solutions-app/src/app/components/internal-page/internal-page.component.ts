import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

export interface InternalPageData {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumbItems: BreadcrumbItem[];
}

@Component({
  selector: 'app-internal-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './internal-page.component.html',
  styleUrls: ['./internal-page.component.css']
})
export class InternalPageComponent {
  @Input() pageData!: InternalPageData;
}
