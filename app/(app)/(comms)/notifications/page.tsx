// Scopo: consultare e gestire tutte le notifiche generate da AI, clienti e IoT.
'use client';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { SectionCard } from '@/components/shared/section-card';
import { useGetNotificationsQuery } from '@/services/mockApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  markNotificationAsRead,
  markNotificationAsResolved,
} from '@/store/slices/notificationsSlice';
import { NotificationItem } from '@/types';

const typeTone: Record<NotificationItem['type'], string> = {
  'AI Fallback': 'bg-[rgba(59,130,246,0.16)] text-[#1d4ed8]',
  'Cliente Prioritario': 'bg-[rgba(236,69,90,0.16)] text-[#be123c]',
  'Nota Assegnata': 'bg-[rgba(196,123,44,0.16)] text-[var(--color-primary-600)]',
  IoT: 'bg-[rgba(31,122,77,0.16)] text-[#0f766e]',
  Sistema: 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]',
};

function statusTone(
  notification: NotificationItem,
  readIds: Record<string, boolean>,
  resolvedIds: Record<string, boolean>
) {
  if (resolvedIds[notification.id] || notification.status === 'Risolto') {
    return 'Risolto';
  }
  if (notification.status === 'Nuovo' && !readIds[notification.id]) {
    return 'Nuovo';
  }
  return 'Letto';
}

export default function NotificationsPage() {
  const { data: notifications = [] } = useGetNotificationsQuery();
  const dispatch = useAppDispatch();
  const { readIds, resolvedIds } = useAppSelector((state) => state.notifications);

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Filtra notifiche per tipo o cliente..."
        primaryActionLabel="Segna tutte come lette"
        onPrimaryAction={() =>
          notifications.forEach((n) => dispatch(markNotificationAsRead(n.id)))
        }
      />

      <SectionCard
        title="Centro notifiche"
        subtitle="Raccoglie fallback AI, clienti ad alta attenzione, note assegnate e IoT."
      >
        <VStack space="md">
          {notifications.map((notification) => {
            const tone = typeTone[notification.type];
            const status = statusTone(notification, readIds, resolvedIds);
            return (
              <Box
                key={notification.id}
                className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4"
              >
                <HStack className="items-center justify-between">
                  <Badge
                    size="sm"
                    action="muted"
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}
                  >
                    <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                      {notification.type}
                    </Text>
                  </Badge>
                  <Text className="text-xs text-[var(--color-neutral-600)]">
                    {new Date(notification.timestamp).toLocaleString('it-IT', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </HStack>
                <Text className="mt-3 text-base font-semibold text-[var(--color-neutral-900)]">
                  {notification.title}
                </Text>
                <Text className="mt-2 text-sm leading-6 text-[var(--color-neutral-600)]">
                  {notification.message}
                </Text>
                <HStack className="mt-4 flex-row flex-wrap gap-3">
                  <Badge
                    size="sm"
                    action="muted"
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      status === 'Nuovo'
                        ? 'bg-[rgba(196,123,44,0.16)] text-[var(--color-primary-600)]'
                        : status === 'Risolto'
                        ? 'bg-[rgba(31,122,77,0.16)] text-[#0f766e]'
                        : 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]'
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        status === 'Nuovo'
                          ? 'text-[var(--color-primary-600)]'
                          : status === 'Risolto'
                          ? 'text-[#0f766e]'
                          : 'text-[var(--color-neutral-600)]'
                      }`}
                    >
                      Stato · {status}
                    </Text>
                  </Badge>
                  {notification.relatedCustomerId ? (
                    <Badge
                      size="sm"
                      action="muted"
                      className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
                    >
                      <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                        Cliente · {notification.relatedCustomerId}
                      </Text>
                    </Badge>
                  ) : null}
                  {notification.relatedBookingId ? (
                    <Badge
                      size="sm"
                      action="muted"
                      className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
                    >
                      <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                        Prenotazione · {notification.relatedBookingId}
                      </Text>
                    </Badge>
                  ) : null}
                </HStack>
                <HStack className="mt-4 flex-row gap-3">
                  {status !== 'Risolto' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      action="primary"
                      className="border-[var(--color-primary-600)] bg-transparent px-4"
                      onPress={() => dispatch(markNotificationAsRead(notification.id))}
                    >
                      <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                        Segna come letto
                      </Text>
                    </Button>
                  ) : null}
                  {status !== 'Risolto' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      action="default"
                      className="border-[var(--color-border)] bg-[var(--color-surface)] px-4"
                      onPress={() =>
                        dispatch(markNotificationAsResolved(notification.id))
                      }
                    >
                      <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                        Contrassegna risolto
                      </Text>
                    </Button>
                  ) : null}
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </SectionCard>
    </Box>
  );
}

// mock: notificationsMock
// actions: markNotificationAsRead(id), markNotificationAsResolved(id)
// assumptions: filtri e ricerche sono placeholder in attesa di backend
