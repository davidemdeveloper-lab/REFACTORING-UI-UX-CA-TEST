import type { Device } from '@/types';

export const devices: Device[] = [
  {
    id: 'dev-1',
    name: 'Smart Lock Suite 502',
    location: 'Piano 5 - Vista mare',
    status: 'online',
    battery: 92,
    lastPing: '2024-09-29T09:50:00',
    type: 'Accesso',
  },
  {
    id: 'dev-2',
    name: 'Sensore Clima SPA',
    location: 'Area wellness',
    status: 'warning',
    battery: 61,
    lastPing: '2024-09-29T09:43:00',
    type: 'Clima',
  },
  {
    id: 'dev-3',
    name: 'Luci dinamiche Rooftop',
    location: 'Terrazza panoramica',
    status: 'online',
    battery: 100,
    lastPing: '2024-09-29T09:51:00',
    type: 'Illuminazione',
  },
  {
    id: 'dev-4',
    name: 'Assistente vocale Lobby',
    location: 'Reception centrale',
    status: 'offline',
    battery: 0,
    lastPing: '2024-09-29T07:18:00',
    type: 'Voce',
  },
  {
    id: 'dev-5',
    name: 'Termostato Villa Privata',
    location: 'Villa Aurora',
    status: 'online',
    battery: 75,
    lastPing: '2024-09-29T09:39:00',
    type: 'Clima',
  },
];
