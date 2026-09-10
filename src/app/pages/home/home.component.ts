import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../core/catalog';
import { SALON } from '../../core/salon';
import { RevealDirective } from '../../core/reveal.directive';
import { TestimonialsComponent } from './testimonials.component';

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

interface Step {
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, RevealDirective, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly salon = SALON;
  readonly services = SERVICES;

  readonly icons: Record<string, string> = {
    'full-groom': '✂️',
    bath: '🛁',
    trim: '💇',
    nails: '🐾',
    spa: '🧖',
  };

  readonly marquee = [
    'Kupanje',
    'Šišanje po rasi',
    'Stilizovanje',
    'Spa paket',
    'Nokti i šape',
    'Bez žurbe',
    'Voždovac',
  ];

  readonly gallery: GalleryItem[] = [
    { src: 'images/grooming.jpg', alt: 'Pas tokom grooming tretmana', caption: 'Tretman u toku' },
    { src: 'images/puppy.jpg', alt: 'Mladunac sa mekom dlakom', caption: 'Prvi put u salonu' },
    { src: 'images/walk.jpg', alt: 'Pas u šetnji posle šišanja', caption: 'Posle šišanja' },
    { src: 'images/friends.jpg', alt: 'Vlasnik i pas zajedno', caption: 'Kući, sređen' },
  ];

  readonly steps: Step[] = [
    {
      title: 'Nalog',
      text: 'Prijavi se ili se registruj za minut. Za POC ništa ne ide u bazu — samo u memoriju aplikacije.',
    },
    {
      title: 'Datum i vreme',
      text: 'Izaberi uslugu, ljubimca, slobodan dan i sat. Termini su vizuelni slotovi, bez telefoniranja.',
    },
    {
      title: 'Loyalty',
      text: 'Kartica sa 5 pečata. Peti pečat je nagrada: 40% manje na taj tretman.',
    },
  ];

  readonly stamps = [1, 2, 3, 4, 5];
}
