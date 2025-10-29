'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import {
  CalendarClock,
  Globe2,
  GitBranch,
  LayoutDashboard,
  MessageCircle,
  Sparkles,
  Users,
  Search,
  Bot,
} from 'lucide-react-native';
import { reservations, clients, chatThreads, workflowBlueprints } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

type IconComponent = typeof LayoutDashboard;

export interface CommandNavigationItem {
  label: string;
  href: string;
  description: string;
  icon: IconComponent;
}

interface CommandCenterProps {
  open: boolean;
  query: string;
  navigation: CommandNavigationItem[];
  onOpenChange: (open: boolean) => void;
  onQueryChange: (value: string) => void;
}

type BadgeTone = 'muted' | 'info' | 'success' | 'warning';

interface CommandItem {
  id: string;
  group: string;
  label: string;
  description: string;
  icon: IconComponent;
  href: string;
  badge?: { label: string; tone: BadgeTone };
  meta?: string;
}

function mapReservationTone(status: string): BadgeTone {
  switch (status) {
    case 'Confermata':
    case 'In Soggiorno':
      return 'success';
    case 'Richiesta':
      return 'info';
    case 'Check-out':
      return 'muted';
    default:
      return 'warning';
  }
}

function mapThreadTone(status: string): BadgeTone {
  switch (status) {
    case 'aperto':
      return 'info';
    case 'chiuso':
      return 'muted';
    default:
      return 'warning';
  }
}

export function CommandCenter({ open, query, navigation, onOpenChange, onQueryChange }: CommandCenterProps) {
  const router = useRouter();
  const queryInputRef = useRef<any>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      queryInputRef.current?.focus?.();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  const commandItems = useMemo<CommandItem[]>(() => {
    const navigationItems = navigation.map((item) => ({
      id: `nav-${item.href}`,
      group: 'Navigazione',
      label: item.label,
      description: item.description,
      icon: item.icon ?? LayoutDashboard,
      href: item.href,
      meta: 'Vai alla sezione',
    }));

    const reservationItems = reservations.slice(0, 8).map((reservation) => ({
      id: `reservation-${reservation.id}`,
      group: 'Prenotazioni',
      label: `${reservation.guestName} · ${formatDate(reservation.arrival)}`,
      description: `${reservation.roomType} · ${reservation.nights} notti · ${formatCurrency(reservation.amount)}`,
      icon: CalendarClock,
      href: `/reservations/${reservation.id}`,
      badge: { label: reservation.status, tone: mapReservationTone(reservation.status) },
      meta: reservation.channel,
    }));

    const clientItems = clients.slice(0, 8).map((client) => ({
      id: `client-${client.id}`,
      group: 'Clienti',
      label: client.fullName,
      description: `${client.staysCount} soggiorni · ${client.loyaltyTier} · ${client.email}`,
      icon: Users,
      href: `/clients/${client.id}`,
      badge: { label: client.newsletter ? 'Newsletter' : 'No newsletter', tone: client.newsletter ? 'success' : 'muted' },
      meta: client.country,
    }));

    const chatItems = chatThreads.slice(0, 6).map((thread) => ({
      id: `chat-${thread.id}`,
      group: 'Chat assistita',
      label: thread.subject,
      description: `${thread.guestName} · Ultimo messaggio ${formatDate(thread.lastMessageAt)}`,
      icon: MessageCircle,
      href: '/chat',
      badge: { label: thread.status, tone: mapThreadTone(thread.status) },
      meta: thread.source.toUpperCase(),
    }));

    const workflowItems = workflowBlueprints.slice(0, 5).map((workflow) => ({
      id: `workflow-${workflow.id}`,
      group: 'Workflow',
      label: workflow.name,
      description: `${workflow.steps.length} step · Conversione ${Math.round(workflow.conversion * 100)}%`,
      icon: GitBranch,
      href: '/workflow',
      badge: { label: workflow.avgTime, tone: 'info' },
    }));

    const quickActions: CommandItem[] = [
      {
        id: 'action-new-booking',
        group: 'Azioni rapide',
        label: 'Crea nuova prenotazione',
        description: 'Proposte multi-camera, pagamento diretto o manuale',
        icon: Sparkles,
        href: '/booking/new',
        badge: { label: 'Wizard', tone: 'info' },
      },
      {
        id: 'action-open-chat',
        group: 'Azioni rapide',
        label: 'Apri chat unificata',
        description: 'Email, WhatsApp e Booking con suggerimenti AI',
        icon: Bot,
        href: '/chat',
        badge: { label: 'AI', tone: 'success' },
      },
      {
        id: 'action-guest-portal',
        group: 'Azioni rapide',
        label: 'Anteprima portale ospite',
        description: 'Esplora i servizi digitali dedicati al cliente',
        icon: Globe2,
        href: '/guest-portal',
        badge: { label: 'Esperienza', tone: 'muted' },
      },
    ];

    return [
      ...quickActions,
      ...navigationItems,
      ...reservationItems,
      ...clientItems,
      ...chatItems,
      ...workflowItems,
    ];
  }, [navigation]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commandItems;
    return commandItems.filter((item) =>
      [item.label, item.description, item.meta].some((value) => value?.toLowerCase().includes(normalizedQuery))
    );
  }, [commandItems, query]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce<Record<string, CommandItem[]>>((groups, item) => {
      if (!groups[item.group]) {
        groups[item.group] = [];
      }
      groups[item.group].push(item);
      return groups;
    }, {});
  }, [filteredItems]);

  const handleSelect = useCallback(
    (item: CommandItem) => {
      onOpenChange(false);
      router.push(item.href);
    },
    [router, onOpenChange]
  );

  const handleSubmit = useCallback(() => {
    if (filteredItems.length === 0) return;
    handleSelect(filteredItems[0]);
  }, [filteredItems, handleSelect]);

  return (
    <Modal isOpen={open} onClose={() => onOpenChange(false)} size="lg">
      <ModalBackdrop className="bg-background-950/80 backdrop-blur-sm" />
      <ModalContent className="w-full max-w-3xl border border-white/10 bg-background-0/80 backdrop-blur-2xl text-typography-0">
        <ModalHeader className="flex flex-col gap-2 border-b border-white/5 pb-4">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Command Center</Text>
          <Text className="text-xl font-semibold text-typography-0">
            Naviga e agisci in tutto il Customer Automator
          </Text>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-6 py-6">
          <Input
            size="lg"
            className="rounded-2xl border-white/10 bg-background-0/60"
            accessibilityLabel="Ricerca rapida"
          >
            <InputSlot>
              <InputIcon as={Search} color="rgb(var(--color-typography-400))" size={18} />
            </InputSlot>
            <InputField
              ref={queryInputRef}
              value={query}
              onChangeText={onQueryChange}
              onSubmitEditing={handleSubmit}
              placeholder="Cerca clienti, prenotazioni, azioni AI..."
              placeholderTextColor="rgba(226,231,245,0.6)"
              autoFocus
              returnKeyType="go"
            />
          </Input>

          {filteredItems.length === 0 ? (
            <Box className="rounded-3xl border border-dashed border-white/10 bg-background-0/40 p-10 text-center">
              <Text className="text-sm text-typography-200">
                Nessun risultato per "{query}". Prova con il nome di un ospite, una stanza o una parola chiave del workflow.
              </Text>
            </Box>
          ) : (
            <Box className="flex max-h-[50vh] flex-col gap-5 overflow-y-auto pr-2">
              {Object.entries(groupedItems).map(([group, items]) => (
                <Box key={group} className="flex flex-col gap-3">
                  <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">{group}</Text>
                  <Box className="flex flex-col gap-2">
                    {items.map((item) => {
                      const Icon = item.icon ?? LayoutDashboard;
                      return (
                        <Pressable
                          key={item.id}
                          className="group flex flex-row items-center gap-4 rounded-2xl border border-white/5 bg-background-0/40 px-4 py-3 transition-all hover:border-primary-500/60 hover:bg-primary-500/10"
                          onPress={() => handleSelect(item)}
                        >
                          <Box className="rounded-2xl bg-primary-500/15 p-3">
                            <Icon color="rgb(var(--color-primary-500))" size={18} />
                          </Box>
                          <Box className="flex flex-1 flex-col gap-1">
                            <Text className="text-sm font-semibold text-typography-0">{item.label}</Text>
                            <Text className="text-xs text-typography-300">{item.description}</Text>
                          </Box>
                          {item.meta ? (
                            <Text className="text-xs font-semibold text-typography-400">{item.meta}</Text>
                          ) : null}
                          {item.badge ? (
                            <Badge action={item.badge.tone} variant="outline" size="sm" className="rounded-xl border-white/20">
                              <BadgeText className="text-[10px] font-semibold tracking-[0.2em] uppercase text-typography-200">
                                {item.badge.label}
                              </BadgeText>
                            </Badge>
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </ModalBody>
        <ModalFooter className="flex items-center justify-between border-t border-white/5 pt-4">
          <Box className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-typography-400">
            <Box className="rounded-xl border border-white/20 bg-background-0/40 px-2 py-1">Esc</Box>
            <Text className="text-[11px]">per chiudere</Text>
          </Box>
          <Box className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-typography-400">
            <Box className="rounded-xl border border-white/20 bg-background-0/40 px-2 py-1">Invio</Box>
            <Text className="text-[11px]">per aprire il primo risultato</Text>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
