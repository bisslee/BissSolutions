import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BreadcrumbService, BreadcrumbItem } from '../../services/breadcrumb.service';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadcrumbItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private breadcrumbService: BreadcrumbService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(breadcrumbs => {
        this.breadcrumbs = breadcrumbs;
        
        // Adicionar Schema.org para breadcrumbs se houver mais de 1 item
        if (breadcrumbs.length > 1) {
          const breadcrumbSchema = this.breadcrumbService.generateBreadcrumbSchema(breadcrumbs);
          this.schemaService.addJsonLd(breadcrumbSchema, 'breadcrumb-schema');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Verificar se é o último item (não mostrar seta)
  isLastItem(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }
}
