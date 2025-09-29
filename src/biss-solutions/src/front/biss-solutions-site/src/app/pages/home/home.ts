import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Carousel } from '../../components/carousel/carousel';
import { SeoService } from '../../services/seo.service';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, Carousel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEOWithSchema(this.seoService.getHomeSEO());
    this.schemaService.addServiceSchema();
    this.schemaService.addLocalBusinessSchema();
    this.seoService.preloadCriticalImages();
  }

}
