import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../core/catalog';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  readonly services = SERVICES;
}
