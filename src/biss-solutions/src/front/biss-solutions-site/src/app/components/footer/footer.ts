import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  version = '';

  constructor(private versionService: VersionService) {
    this.version = this.versionService.getVersion();
  }
}
