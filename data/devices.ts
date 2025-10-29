import type { Device } from '@/types';

export const devices: Device[] = [
  {
    id: 'device-door-802',
    name: 'Sensore Porta Balcone 802',
    location: 'Piano 8 · Camera 802',
    status: 'online',
    lastPing: '2025-01-22T21:05:00Z',
    battery: 82,
    automationBound: 'Alert porta aperta oltre 10 minuti',
  },
  {
    id: 'device-clima-1702',
    name: 'Climatizzazione Suite 1702',
    location: 'Piano 17 · Suite Skyline',
    status: 'manutenzione',
    lastPing: '2025-01-22T09:30:00Z',
    battery: 100,
    automationBound: 'Comfort termico pre check-in',
  },
  {
    id: 'device-beacon-spa',
    name: 'Beacon Spa Privata',
    location: 'Piano 19 · Spa Signature',
    status: 'online',
    lastPing: '2025-01-22T20:15:00Z',
    battery: 67,
    automationBound: 'Attivazione cromoterapia al check-in',
  },
  {
    id: 'device-coffee-lounge',
    name: 'Coffee Station Lounge',
    location: 'Piano 20 · Lounge Panorama',
    status: 'offline',
    lastPing: '2025-01-21T23:55:00Z',
    battery: 54,
    automationBound: 'Refill automatico capsule premium',
  },
];
