import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { BookingService } from '../../core/booking.service';
import { LoyaltyService } from '../../core/loyalty.service';
import { SERVICES, priceFor } from '../../core/catalog';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly booking = inject(BookingService);
  readonly auth = inject(AuthService);
  readonly loyalty = inject(LoyaltyService);

  submitted = false;
  readonly minDate = this.todayLocal();
  readonly services = SERVICES;
  readonly times = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];

  readonly form = this.fb.nonNullable.group({
    petName: ['', [Validators.required, Validators.minLength(2)]],
    service: [this.services[0].id, Validators.required],
    date: [this.minDate, Validators.required],
    time: ['', Validators.required],
  });

  selectTime(time: string): void {
    this.form.controls.time.setValue(time);
  }

  private todayLocal(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue();
    const service = this.services.find((item) => item.id === value.service);
    const discounted = this.loyalty.isRewardVisit();
    const user = this.auth.user();
    this.booking.save({
      petName: value.petName,
      service: service?.label ?? value.service,
      serviceId: value.service,
      date: value.date,
      time: value.time,
      discounted,
      price: priceFor(value.service, discounted),
      ownerName: user?.name ?? 'Gost',
      ownerEmail: user?.email ?? '',
    });
    void this.router.navigateByUrl('/confirmation');
  }
}
