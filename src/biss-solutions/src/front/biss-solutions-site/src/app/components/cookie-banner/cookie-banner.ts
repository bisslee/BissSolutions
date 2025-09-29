import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css'
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    // Mostrar banner apenas se for primeira visita
    this.showBanner = this.cookieService.isFirstVisit();
  }

  acceptCookies(): void {
    this.cookieService.giveConsent();
    this.showBanner = false;
  }

  denyCookies(): void {
    this.cookieService.denyConsent();
    this.showBanner = false;
  }
}
