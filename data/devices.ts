import { Device } from '@/types';

export const devices: Device[] = [
  {
    id: 'd1',
    name: 'Suite 502 · Termostato',
    location: 'Torre Aurora – Piano 5',
    status: 'warning',
    lastPing: '2 minuti fa',
    metrics: { energy: 42, occupancy: 80, battery: 58 },
    automation: 'Scenario comfort sunset',
  },
  {
    id: 'd2',
    name: 'Lobby · Diffusore fragranze',
    location: 'Ingresso principale',
    status: 'online',
    lastPing: '1 minuto fa',
    metrics: { energy: 12, occupancy: 96, battery: 100 },
    automation: 'Rituale benvenuto serale',
  },
  {
    id: 'd3',
    name: 'Spa · Illuminazione cromoterapica',
    location: 'Piano -1',
    status: 'online',
    lastPing: '30 secondi fa',
    metrics: { energy: 64, occupancy: 45, battery: 88 },
    automation: 'Percorso sensoriale acqua-luce',
  },
  {
    id: 'd4',
    name: 'Camera 210 · Smart mirror',
    location: 'Ala Giardino – Piano 2',
    status: 'offline',
    lastPing: '45 minuti fa',
    metrics: { energy: 0, occupancy: 0, battery: 12 },
    automation: 'Messaggio personalizzato arrivo',
  },
];
