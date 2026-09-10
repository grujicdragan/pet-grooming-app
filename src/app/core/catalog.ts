export interface GroomingService {
  id: string;
  label: string;
  minutes: number;
  price: number;
  blurb: string;
}

export const SERVICES: GroomingService[] = [
  {
    id: 'full-groom',
    label: 'Pun grooming',
    minutes: 90,
    price: 4500,
    blurb: 'Kupanje, sušenje, šišanje po rasi i završni styling.',
  },
  {
    id: 'bath',
    label: 'Kupanje i feniranje',
    minutes: 45,
    price: 2800,
    blurb: 'Nežni šampon, fen i rasčešljavanje bez pune korekcije.',
  },
  {
    id: 'trim',
    label: 'Korekcija šišanja',
    minutes: 40,
    price: 2200,
    blurb: 'Održavanje forme između kompletnih tretmana.',
  },
  {
    id: 'nails',
    label: 'Šišanje noktiju',
    minutes: 20,
    price: 900,
    blurb: 'Brzo, mirno skraćivanje noktiju i pregled šapa.',
  },
  {
    id: 'spa',
    label: 'Spa paket',
    minutes: 75,
    price: 3900,
    blurb: 'Kupanje, maska za dlaku, uši i lagana masaža.',
  },
];

export function priceFor(serviceId: string, discounted: boolean): number {
  const service = SERVICES.find((item) => item.id === serviceId);
  const base = service?.price ?? 0;
  return discounted ? Math.round(base * 0.6) : base;
}
