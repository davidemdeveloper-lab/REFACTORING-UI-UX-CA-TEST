import { IoTRoomStatus } from '@/types';

export const iotRoomsMock: IoTRoomStatus[] = [
  {
    roomId: '204',
    roomLabel: 'Camera 204 · Deluxe',
    comfort: 'Ottimale',
    temperature: 21.5,
    humidity: 45,
    minibarLevel: 72,
    lastUpdate: '2025-10-28T07:50:00Z',
  },
  {
    roomId: '305',
    roomLabel: 'Camera 305 · Family',
    comfort: 'Attenzione',
    temperature: 24.8,
    humidity: 58,
    minibarLevel: 18,
    lastUpdate: '2025-10-28T07:40:00Z',
  },
  {
    roomId: '411',
    roomLabel: 'Camera 411 · Suite',
    comfort: 'Ottimale',
    temperature: 22.1,
    humidity: 47,
    minibarLevel: 34,
    lastUpdate: '2025-10-28T07:42:00Z',
  },
  {
    roomId: '512',
    roomLabel: 'Camera 512 · Superior',
    comfort: 'Critico',
    temperature: 18.4,
    humidity: 38,
    minibarLevel: 12,
    lastUpdate: '2025-10-28T07:35:00Z',
  },
  {
    roomId: '601',
    roomLabel: 'Camera 601 · Penthouse',
    comfort: 'Ottimale',
    temperature: 21.9,
    humidity: 44,
    minibarLevel: 66,
    lastUpdate: '2025-10-28T07:30:00Z',
  },
];

export const comfortSummaryMock = {
  comfortRate: 0.87,
  roomsOutOfRange: ['305', '512'],
  minibarToRefill: ['305', '512', '411'],
};

