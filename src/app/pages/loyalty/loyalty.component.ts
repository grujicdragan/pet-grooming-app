import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoyaltyService, REWARD_DISCOUNT, TREATMENTS_PER_REWARD } from '../../core/loyalty.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-loyalty',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './loyalty.component.html',
  styleUrl: './loyalty.component.scss',
})
export class LoyaltyComponent {
  readonly loyalty = inject(LoyaltyService);
  readonly auth = inject(AuthService);
  readonly cycle = TREATMENTS_PER_REWARD;
  readonly discountPercent = REWARD_DISCOUNT * 100;
}
