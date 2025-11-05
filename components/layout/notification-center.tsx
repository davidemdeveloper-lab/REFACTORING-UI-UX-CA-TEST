'use client';

import { useMemo } from 'react';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { CloseIcon } from '@/components/ui/icon';
import { NotificationItem } from '@/types';

type NotificationCenterProps = {
  isOpen: boolean;
  notifications: NotificationItem[];
  readIds: Record<string, boolean>;
  resolvedIds: Record<string, boolean>;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAsResolved: (id: string) => void;
};

const typeToColor: Record<NotificationItem['type'], string> = {
  'AI Fallback': 'bg-[rgba(228,97,35,0.12)] text-[var(--color-primary-600)]',
  'Cliente Prioritario': 'bg-[rgba(236,69,90,0.14)] text-[#be123c]',
  'Nota Assegnata': 'bg-[rgba(59,130,246,0.14)] text-[#1d4ed8]',
  IoT: 'bg-[rgba(16,172,132,0.14)] text-[#0d9488]',
  Sistema: 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]',
};

const typeTextColor: Record<NotificationItem['type'], string> = {
  'AI Fallback': 'text-[var(--color-primary-600)]',
  'Cliente Prioritario': 'text-[#be123c]',
  'Nota Assegnata': 'text-[#1d4ed8]',
  IoT: 'text-[#0d9488]',
  Sistema: 'text-[var(--color-neutral-600)]',
};

function formatTimestamp(value: string) {
  const date = new Date(value);
  return date.toLocaleString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  });
}

export function NotificationCenter({
  isOpen,
  notifications,
  readIds,
  resolvedIds,
  onClose,
  onMarkAsRead,
  onMarkAsResolved,
}: NotificationCenterProps) {
  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [notifications]
  );

  return (
    <Box
      className={`absolute right-6 top-8 bottom-6 w-[380px] rounded-3xl border border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-6 py-6 shadow-lg transition-all duration-200 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <HStack className="items-center justify-between pb-4">
        <Box>
          <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Centro notifiche
          </Text>
          <Text className="text-xl font-semibold text-[var(--color-neutral-900)]">
            Ultimi aggiornamenti
          </Text>
        </Box>
        <Button
          size='sm'
          variant='outline'
          action='default'
          onPress={onClose}
          className="h-9 w-9 rounded-full border-[var(--color-primary-border-soft)] bg-transparent"
        >
          <CloseIcon className="text-[var(--color-neutral-600)]" />
        </Button>
      </HStack>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
      >
        {sortedNotifications.map((notification) => {
          const alreadyRead = readIds[notification.id] || notification.status !== 'Nuovo';
          const resolved = resolvedIds[notification.id] || notification.status === 'Risolto';
          return (
            <Box
              key={notification.id}
              className="rounded-2xl border border-[var(--color-primary-border-soft)] bg-[var(--color-background)] p-4"
            >
              <HStack className="items-center justify-between">
                <Badge
                  size="sm"
                  action="muted"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${typeToColor[notification.type]}`}
                >
                  <Text className={`text-xs font-semibold ${typeTextColor[notification.type]}`}>
                    {notification.type}
                  </Text>
                </Badge>
                <Text className="text-xs text-[var(--color-neutral-600)]">
                  {formatTimestamp(notification.timestamp)}
                </Text>
              </HStack>
              <Text className="mt-3 text-base font-semibold text-[var(--color-neutral-900)]">
                {notification.title}
              </Text>
              <Text className="mt-2 text-sm leading-6 text-[var(--color-neutral-600)]">
                {notification.message}
              </Text>
              <HStack className="mt-4 flex-row flex-wrap gap-2">
                {!alreadyRead ? (
                  <Button
                    size="sm"
                    variant="outline"
                    action="primary"
                    className="border-[var(--color-primary-600)] bg-transparent px-3"
                    onPress={() => onMarkAsRead(notification.id)}
                  >
                    <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                      Segna come letto
                    </Text>
                  </Button>
                ) : null}
                {!resolved ? (
                  <Button
                    size="sm"
                    variant="outline"
                    action="default"
                    className="border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-3"
                    onPress={() => onMarkAsResolved(notification.id)}
                  >
                    <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                      Contrassegna risolto
                    </Text>
                  </Button>
                ) : (
                  <Badge
                    size="sm"
                    action="muted"
                    className="rounded-full bg-[rgba(31,122,77,0.12)] px-3 py-1 text-xs font-semibold text-[#0f766e]"
                  >
                    <Text className="text-xs font-semibold text-[#0f766e]">
                      Risolto
                    </Text>
                  </Badge>
                )}
              </HStack>
            </Box>
          );
        })}
        {sortedNotifications.length === 0 ? (
          <Box className="items-center justify-center py-10">
            <Text className="text-sm text-[var(--color-neutral-600)]">
              Nessuna notifica da mostrare: ottimo lavoro!
            </Text>
          </Box>
        ) : null}
      </ScrollView>
    </Box>
  );
}
