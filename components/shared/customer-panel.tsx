'use client';

import { Customer, Note } from '@/types';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { ArrowUpRight, Plus } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';

type CustomerPanelProps = {
  customer: Customer;
  notes?: Note[];
  onAddNote?: () => void;
  onOpenCustomer?: () => void;
};

export function CustomerPanel({
  customer,
  notes = [],
  onAddNote,
  onOpenCustomer,
}: CustomerPanelProps) {
  const latestNote = notes[0] ?? null;

  return (
    <Box className="flex h-full flex-col rounded-3xl border border-transparent bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
      <VStack space="xl" className="flex-1">
        <Box>
          <HStack className="items-start justify-between gap-3">
            <Box>
              <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                Cliente
              </Text>
              <Text className="mt-3 text-2xl font-semibold text-[var(--color-neutral-900)]">
                {customer.firstName} {customer.lastName}
              </Text>
              <Text className="mt-1 text-sm text-[var(--color-neutral-600)]">
                Registrato il {new Date(customer.registeredAt).toLocaleDateString('it-IT')}
              </Text>
            </Box>
            {onOpenCustomer ? (
              <Button
                size="sm"
                variant="outline"
                action="primary"
                className="rounded-full border-[var(--color-primary-600)] bg-transparent px-3 py-2"
                onPress={onOpenCustomer}
              >
                <HStack className="items-center gap-1">
                  <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                    Apri scheda
                  </Text>
                  <ArrowUpRight size={14} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
                </HStack>
              </Button>
            ) : null}
          </HStack>
        </Box>

        <Box className="rounded-2xl border border-transparent bg-[var(--color-background)] px-4 py-4">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
            Contatti
          </Text>
          <VStack space="xs" className="mt-3">
            <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
              {customer.email}
            </Text>
            <Text className="text-sm text-[var(--color-neutral-600)]">{customer.phone}</Text>
            {customer.secondaryPhone ? (
              <Text className="text-sm text-[var(--color-neutral-600)]">
                {customer.secondaryPhone}
              </Text>
            ) : null}
          </VStack>
        </Box>

        <Box className="rounded-2xl border border-transparent bg-[var(--color-background)] px-4 py-4">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
            Comunicazioni
          </Text>
          <VStack space="md" className="mt-3">
            <InfoRow label="Ultimo evento" value={customer.ultimoEvento} />
            <Divider className="border-[var(--color-border)]" />
            <InfoRow label="Prossimo evento" value={customer.prossimoInvio} highlight />
          </VStack>
        </Box>

        {latestNote ? (
          <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
            <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
              Nota recente
            </Text>
            <Text className="mt-3 text-sm font-semibold text-[var(--color-neutral-900)]">
              {latestNote.title}
            </Text>
            <Text className="mt-2 max-h-[4.5rem] text-sm leading-6 text-[var(--color-neutral-600)] overflow-hidden">
              {latestNote.content}
            </Text>
          </Box>
        ) : null}
      </VStack>

      {onAddNote ? (
        <Button
          size="sm"
          variant="outline"
          action="default"
          className="mt-6 self-start rounded-full border-[var(--color-border)] bg-transparent px-4"
          onPress={onAddNote}
        >
          <HStack className="items-center gap-2">
            <Plus size={14} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
            <Text className="text-xs font-semibold text-[var(--color-neutral-700)]">
              Aggiungi nota
            </Text>
          </HStack>
        </Button>
      ) : null}
    </Box>
  );
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string | null;
  highlight?: boolean;
}) {
  return (
    <VStack space="xs">
      <Text
        className={`text-[11px] uppercase tracking-[0.25em] ${
          highlight ? 'text-[var(--color-primary-600)]' : 'text-[var(--color-neutral-500)]'
        }`}
      >
        {label}
      </Text>
      <Text
        className={`text-sm leading-6 ${
          highlight ? 'font-semibold text-[var(--color-primary-600)]' : 'text-[var(--color-neutral-700)]'
        }`}
      >
        {value ?? '—'}
      </Text>
    </VStack>
  );
}
