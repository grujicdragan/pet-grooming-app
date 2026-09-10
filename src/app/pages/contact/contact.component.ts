import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SALON } from '../../core/salon';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly salon = SALON;
  readonly mapUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(SALON.mapEmbedUrl);
}
