import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="social-links">
      <a
        *ngFor="let link of socialLinks"
        [href]="link.url"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="link.name"
        class="social-link"
        [ngClass]="link.name.toLowerCase()"
      >
        <i [class]="link.icon"></i>
      </a>
    </div>
  `,
  styles: [`
    .social-links {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #1e293b;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 0.875rem;
    }

    .social-link:hover {
      background-color: #334155;
      transform: translateY(-1px);
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .social-links {
        gap: 0.5rem;
      }

      .social-link {
        width: 28px;
        height: 28px;
        font-size: 0.8rem;
      }
    }

    @media (max-width: 480px) {
      .social-links {
        gap: 0.4rem;
      }

      .social-link {
        width: 24px;
        height: 24px;
        font-size: 0.75rem;
      }
    }
  `]
})
export class SocialComponent {
  @Input() socialLinks: SocialLink[] = [
    // {
    //   name: 'Instagram',
    //   url: 'https://instagram.com/bisssolutions',
    //   icon: 'ri-instagram-line'
    // },
    //       {
    //     name: 'Bluesky',
    //     url: 'https://bsky.app/profile/bisssolutions.bsky.social',
    //     icon: 'ri-bluesky-line'
    //   },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/bisssolutions',
      icon: 'ri-linkedin-box-line'
    },
    // {
    //   name: 'YouTube',
    //   url: 'https://youtube.com/@bisssolutions',
    //   icon: 'ri-youtube-line'
    // },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/5511952729399',
      icon: 'ri-whatsapp-line'
    }
  ];
}
