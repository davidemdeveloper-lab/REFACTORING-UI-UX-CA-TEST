// Scopo: mock mobile-first del guest portal per l'ospite finale.
'use client';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetGuestPortalCardsQuery } from '@/services/mockApi';

const categoryTone: Record<string, string> = {
  Ristorante: 'bg-[rgba(196,123,44,0.16)] text-[var(--color-primary-600)]',
  Spa: 'bg-[rgba(22,163,74,0.16)] text-[#15803d]',
  Esperienze: 'bg-[rgba(59,130,246,0.16)] text-[#1d4ed8]',
  Prodotti: 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]',
  Servizi: 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]',
};

export default function GuestPortalPage() {
  const { data: cards = [] } = useGetGuestPortalCardsQuery();

  return (
    <Box className="flex w-full justify-center pb-16">
      <Box className="w-full max-w-[420px] rounded-[40px] border border-[var(--color-border)] bg-white px-6 py-10 shadow-[var(--shadow-card)]">
        <Text className="text-center text-[32px] font-semibold text-[var(--color-neutral-900)]">
          Guest Portal
        </Text>
        <Text className="mt-2 text-center text-sm leading-6 text-[var(--color-neutral-600)]">
          Benvenuto! Gestisci il soggiorno direttamente dal tuo smartphone: servizi, esperienze e comfort in pochi tap.
        </Text>
        <Button
          size="md"
          action="primary"
          className="mt-6 rounded-full bg-[var(--color-primary-600)] px-6"
        >
          <Text className="text-sm font-semibold text-white">
            Accedi con il tuo codice soggiorno
          </Text>
        </Button>
        <VStack space="lg" className="mt-8">
          {cards.map((card) => (
            <Box
              key={card.id}
              className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-5"
            >
              <Badge
                size="sm"
                action="muted"
                className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${categoryTone[card.category]}`}
              >
                <Text className="text-xs font-semibold text-[var(--color-neutral-900)]">
                  {card.category}
                </Text>
              </Badge>
              <Text className="mt-3 text-lg font-semibold text-[var(--color-neutral-900)]">
                {card.title}
              </Text>
              <Text className="mt-2 text-sm leading-6 text-[var(--color-neutral-600)]">
                {card.description}
              </Text>
              <Button
                size="sm"
                variant="outline"
                action="default"
                className="mt-4 rounded-full border-[var(--color-border)] bg-white"
              >
                <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                  {card.actionLabel}
                </Text>
              </Button>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

// mock: guestPortalCardsMock
// actions: openGuestPortalAction(cardId)
// assumptions: UI mobile-first senza routing pubblico reale
