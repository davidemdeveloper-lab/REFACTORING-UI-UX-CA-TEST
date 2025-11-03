import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { bookingsMock } from '@/mocks/bookings';
import { customersMock } from '@/mocks/customers';
import { conversationsMock } from '@/mocks/conversations';
import { guestPortalCardsMock } from '@/mocks/guest-portal';
import { iotRoomsMock, comfortSummaryMock } from '@/mocks/iot';
import { notesMock } from '@/mocks/notes';
import { notificationsMock } from '@/mocks/notifications';
import { chatQuickActionsMock } from '@/mocks/quick-actions';
import { templatesMock } from '@/mocks/templates';
import {
  Booking,
  Conversation,
  Customer,
  GuestPortalCard,
  IoTRoomStatus,
  Note,
  NotificationItem,
  QuickAction,
  Template,
} from '@/types';

type ComfortSummary = typeof comfortSummaryMock;

export const mockApi = createApi({
  reducerPath: 'mockApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    'Customers',
    'Customer',
    'Bookings',
    'Booking',
    'Templates',
    'Notes',
    'Notifications',
    'Conversations',
    'IoT',
    'GuestPortal',
  ],
  endpoints: (build) => ({
    getCustomers: build.query<Customer[], void>({
      queryFn: async () => ({ data: customersMock }),
      providesTags: ['Customers'],
    }),
    getCustomerById: build.query<Customer, string>({
      queryFn: async (id) => {
        const customer = customersMock.find((item) => item.id === id);
        if (!customer) {
          return { error: { status: 404, data: 'Customer not found' } } as const;
        }
        return { data: customer };
      },
      providesTags: (_result, _error, id) => [{ type: 'Customer', id }],
    }),
    getBookings: build.query<Booking[], void>({
      queryFn: async () => ({ data: bookingsMock }),
      providesTags: ['Bookings'],
    }),
    getBookingById: build.query<Booking, string>({
      queryFn: async (id) => {
        const booking = bookingsMock.find((item) => item.id === id);
        if (!booking) {
          return { error: { status: 404, data: 'Booking not found' } } as const;
        }
        return { data: booking };
      },
      providesTags: (_result, _error, id) => [{ type: 'Booking', id }],
    }),
    getTemplates: build.query<Template[], void>({
      queryFn: async () => ({ data: templatesMock }),
      providesTags: ['Templates'],
    }),
    getNotes: build.query<Note[], { target?: 'Dashboard' | 'Customer' | 'Booking'; targetId?: string } | void>({
      queryFn: async (filter) => {
        if (!filter) {
          return { data: notesMock };
        }
        const { target, targetId } = filter;
        const data = notesMock.filter((note) => {
          if (target && note.target !== target) {
            return false;
          }
          if (targetId && note.targetId !== targetId) {
            return false;
          }
          return true;
        });
        return { data };
      },
      providesTags: ['Notes'],
    }),
    getNotifications: build.query<NotificationItem[], void>({
      queryFn: async () => ({ data: notificationsMock }),
      providesTags: ['Notifications'],
    }),
    getConversations: build.query<Conversation[], void>({
      queryFn: async () => ({ data: conversationsMock }),
      providesTags: ['Conversations'],
    }),
    getConversationById: build.query<Conversation, string>({
      queryFn: async (id) => {
        const conversation = conversationsMock.find((item) => item.id === id);
        if (!conversation) {
          return { error: { status: 404, data: 'Conversation not found' } } as const;
        }
        return { data: conversation };
      },
      providesTags: (_result, _error, id) => [{ type: 'Conversations', id }],
    }),
    getChatQuickActions: build.query<QuickAction[], void>({
      queryFn: async () => ({ data: chatQuickActionsMock }),
    }),
    getIoTRooms: build.query<IoTRoomStatus[], void>({
      queryFn: async () => ({ data: iotRoomsMock }),
      providesTags: ['IoT'],
    }),
    getIoTComfortSummary: build.query<ComfortSummary, void>({
      queryFn: async () => ({ data: comfortSummaryMock }),
      providesTags: ['IoT'],
    }),
    getGuestPortalCards: build.query<GuestPortalCard[], void>({
      queryFn: async () => ({ data: guestPortalCardsMock }),
      providesTags: ['GuestPortal'],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useGetTemplatesQuery,
  useGetNotesQuery,
  useGetNotificationsQuery,
  useGetConversationsQuery,
  useGetConversationByIdQuery,
  useGetChatQuickActionsQuery,
  useGetIoTRoomsQuery,
  useGetIoTComfortSummaryQuery,
  useGetGuestPortalCardsQuery,
} = mockApi;
