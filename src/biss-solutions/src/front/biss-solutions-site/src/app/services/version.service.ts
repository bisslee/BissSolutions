import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  readonly version = '2.5.0';
  readonly buildDate = new Date().toISOString();

  getVersion(): string {
    return this.version;
  }

  getBuildDate(): string {
    return this.buildDate;
  }
}

