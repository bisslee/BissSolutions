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
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
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
