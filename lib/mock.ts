import clients from '@/mock/clients.json';
import bookings from '@/mock/bookings.json';
import templates from '@/mock/templates.json';
import conversations from '@/mock/chat.json';
import analytics from '@/mock/analytics.json';
import devices from '@/mock/iot.json';
import notifications from '@/mock/notifications.json';
import type {
  AnalyticsState,
  Booking,
  Client,
  Conversation,
  IoTDevice,
  Notification,
  Template
} from './types';

export type MockLoaderState<T> = {
  data: T;
  loading: boolean;
  error?: string;
};

const simulateLatency = async () =>
  new Promise((resolve) => {
    setTimeout(resolve, 150);
  });

export const loadClients = async (): Promise<MockLoaderState<Client[]>> => {
  await simulateLatency();
  return { data: clients as Client[], loading: false };
};

export const loadBookings = async (): Promise<MockLoaderState<Booking[]>> => {
  await simulateLatency();
  return { data: bookings as Booking[], loading: false };
};

export const loadTemplates = async (): Promise<MockLoaderState<Template[]>> => {
  await simulateLatency();
  return { data: templates as Template[], loading: false };
};

export const loadConversations = async (): Promise<MockLoaderState<Conversation[]>> => {
  await simulateLatency();
  return { data: conversations as Conversation[], loading: false };
};

export const loadAnalytics = async (): Promise<MockLoaderState<AnalyticsState>> => {
  await simulateLatency();
  return { data: analytics as AnalyticsState, loading: false };
};

export const loadDevices = async (): Promise<MockLoaderState<IoTDevice[]>> => {
  await simulateLatency();
  return { data: devices as IoTDevice[], loading: false };
};

export const loadNotifications = async (): Promise<MockLoaderState<Notification[]>> => {
  await simulateLatency();
  return { data: notifications as Notification[], loading: false };
};
