import { Injectable, computed, inject } from '@angular/core';
import { AuthService } from './auth.service';

export const TREATMENTS_PER_REWARD = 5;
export const REWARD_DISCOUNT = 0.4;

@Injectable({ providedIn: 'root' })
export class LoyaltyService {
  private readonly auth = inject(AuthService);

  readonly treatmentsCompleted = computed(
    () => this.auth.user()?.treatmentsCompleted ?? 0,
  );

  readonly progressInCycle = computed(
    () => this.treatmentsCompleted() % TREATMENTS_PER_REWARD,
  );

  readonly stamps = computed(() => {
    const filled = this.progressInCycle();
    return Array.from({ length: TREATMENTS_PER_REWARD }, (_, index) => ({
      number: index + 1,
      filled: index < filled,
      reward: index === TREATMENTS_PER_REWARD - 1,
    }));
  });

  readonly nextIsReward = computed(
    () => this.progressInCycle() === TREATMENTS_PER_REWARD - 1,
  );

  readonly treatmentsUntilReward = computed(() => {
    const remaining = TREATMENTS_PER_REWARD - this.progressInCycle();
    return remaining === TREATMENTS_PER_REWARD ? TREATMENTS_PER_REWARD : remaining;
  });

  isRewardVisit(): boolean {
    return this.nextIsReward();
  }
}
