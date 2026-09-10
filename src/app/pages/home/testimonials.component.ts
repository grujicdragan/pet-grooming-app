import { Component, OnDestroy, signal } from '@angular/core';

interface Testimonial {
  quote: string;
  name: string;
  pet: string;
  photo: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements OnDestroy {
  readonly items: Testimonial[] = [
    {
      quote: 'Luna izlazi mirnija nego što je ušla. Termin je trajao tačno koliko su rekli.',
      name: 'Mila J.',
      pet: 'Luna, koker',
      photo: 'images/puppy.jpg',
    },
    {
      quote:
        'Konačno salon gde Bobi ne paniči. Loyalty kartica je jasna — peti grooming nam je skoro pa poklon.',
      name: 'Nikola P.',
      pet: 'Bobi, labrador',
      photo: 'images/walk.jpg',
    },
    {
      quote: 'Zakazivanje za 30 sekundi, bez telefona. Spa paket je Maca oduševila.',
      name: 'Ivana S.',
      pet: 'Maca, maine coon',
      photo: 'images/grooming.jpg',
    },
  ];

  readonly intervalMs = 6500;
  readonly index = signal(0);
  readonly paused = signal(false);

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  next(): void {
    this.index.update((value) => (value + 1) % this.items.length);
    this.restartTimer();
  }

  prev(): void {
    this.index.update((value) => (value - 1 + this.items.length) % this.items.length);
    this.restartTimer();
  }

  goTo(i: number): void {
    if (i === this.index()) {
      return;
    }
    this.index.set(i);
    this.restartTimer();
  }

  pause(): void {
    this.paused.set(true);
    this.stopTimer();
  }

  resume(): void {
    if (!this.paused()) {
      return;
    }
    this.paused.set(false);
    this.startTimer();
  }

  private startTimer(): void {
    this.stopTimer();
    this.timer = setInterval(() => {
      this.index.update((value) => (value + 1) % this.items.length);
    }, this.intervalMs);
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private restartTimer(): void {
    if (!this.paused()) {
      this.startTimer();
    }
  }
}
