jest.mock('@gluestack-ui/themed', () => {
  const React = require('react');
  const createMock = (element = 'div') =>
    React.forwardRef(({ children, ...rest }, ref) =>
      React.createElement(element, { ref, ...rest }, children)
    );
  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === '__esModule') return true;
        if (prop === 'default') return {};
        if (prop === 'GluestackUIProvider') {
          return ({ children }) => React.createElement(React.Fragment, null, children);
        }
        if (typeof prop === 'string' && prop.toLowerCase().includes('input')) {
          return createMock('input');
        }
        if (prop === 'SwitchThumb') {
          return createMock('span');
        }
        if (typeof prop === 'string' && prop.toLowerCase().includes('button')) {
          return createMock('button');
        }
        return createMock('div');
      }
    }
  );
});

jest.mock('framer-motion', () => {
  const React = require('react');
  const motion = (Component = 'div') =>
    React.forwardRef(({ children, ...rest }, ref) =>
      React.createElement(Component, { ref, ...rest }, children)
    );
  motion.div = motion('div');
  motion.span = motion('span');
  motion.button = motion('button');
  return { motion };
});

import LandingPage from '@/app/(marketing)/landing/page';
import DashboardPage from '@/app/(app)/dashboard/page';
import ClientsPage from '@/app/(app)/clients/page';
import NewClientPage from '@/app/(app)/clients/new/page';
import BookingsPage from '@/app/(app)/bookings/page';
import BookingDetailPage from '@/app/(app)/bookings/[id]/page';
import LostBookingPage from '@/app/(app)/bookings/lost/new/page';
import TemplatesPage from '@/app/(app)/templates/page';
import TemplateDetailPage from '@/app/(app)/templates/[id]/page';
import ChatPage from '@/app/(app)/chat/page';
import NotificationsPage from '@/app/(app)/notifications/page';
import IoTPage from '@/app/(app)/iot/page';
import ClientDetailPage from '@/app/(app)/clients/[id]/page';

describe('Smoke test pagine', () => {
  it('Landing esporta un componente', () => {
    expect(typeof LandingPage).toBe('function');
  });

  it('Dashboard esporta un componente', () => {
    expect(typeof DashboardPage).toBe('function');
  });

  it('Clients list esporta un componente', () => {
    expect(typeof ClientsPage).toBe('function');
  });

  it('Nuovo cliente esporta un componente', () => {
    expect(typeof NewClientPage).toBe('function');
  });

  it('Dettaglio cliente esporta un componente', () => {
    expect(typeof ClientDetailPage).toBe('function');
  });

  it('Prenotazioni esporta un componente', () => {
    expect(typeof BookingsPage).toBe('function');
  });

  it('Dettaglio prenotazione esporta un componente', () => {
    expect(typeof BookingDetailPage).toBe('function');
  });

  it('Nuovo booking perso esporta un componente', () => {
    expect(typeof LostBookingPage).toBe('function');
  });

  it('Template list esporta un componente', () => {
    expect(typeof TemplatesPage).toBe('function');
  });

  it('Editor template esporta un componente', () => {
    expect(typeof TemplateDetailPage).toBe('function');
  });

  it('Chat esporta un componente', () => {
    expect(typeof ChatPage).toBe('function');
  });

  it('Notifiche esporta un componente', () => {
    expect(typeof NotificationsPage).toBe('function');
  });

  it('IoT esporta un componente', () => {
    expect(typeof IoTPage).toBe('function');
  });
});
