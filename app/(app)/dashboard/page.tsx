import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { bookings, guests, inboxMessages } from '@/lib/mock-data';
import type { Booking } from '@/lib/types';

const overviewCards = [
  {
    label: 'Ospiti in casa',
    value: '28',
    trend: '+12% rispetto a ieri',
  },
  {
    label: 'Automazioni attive',
    value: '46',
    trend: '8 flussi in modalità “cura premium”',
  },
  {
    label: 'Upsell confermati',
    value: '9',
    trend: '+3 rispetto a settimana scorsa',
  },
  {
    label: 'Segnalazioni IoT',
    value: '2',
    trend: '1 frigobar · 1 climatizzazione',
  },
];

export default function DashboardPage() {
  const recentBookings = bookings.slice(0, 2);
  const newsletterGuests = guests.filter((guest) => guest.newsletter);

  return (
    <VStack space="lg" className="pb-16">
      <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.35em] text-primary-700/80">
            Benvenuto, concierge digitale
          </Text>
          <Text className="mt-2 text-4xl font-semibold text-primary-900">
            Dashboard operativa
          </Text>
          <Text className="mt-2 text-sm text-typography-500">
            Tutte le conversazioni, i flussi e i dispositivi IoT in un colpo d’occhio. L’AI ti suggerisce cosa fare ora.
          </Text>
        </Box>
        <HStack space="md" className="flex-wrap">
          <Link href="/bookings/new">
            <Button action="primary" size="lg" className="rounded-full px-6">
              <Text className="text-base font-semibold text-white">Nuova prenotazione</Text>
            </Button>
          </Link>
          <Link href="/chat">
            <Button action="secondary" variant="outline" size="lg" className="rounded-full border-primary-200/60 px-6">
              <Text className="text-base font-semibold text-primary-700">Apri la chat unificata</Text>
            </Button>
          </Link>
        </HStack>
      </Box>

      <OverviewCards />

      <HStack className="flex-col gap-8 xl:flex-row">
        <Box className="glass-panel flex-1 rounded-3xl px-8 py-7">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">
            Conversazioni in primo piano
          </Text>
          <VStack space="md" className="mt-4">
            {inboxMessages.map((message) => (
              <Link key={message.id} href={`/chat?conversation=${message.id}`}>
                <Box className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-all hover:border-primary-200/60">
                  <HStack className="items-start justify-between">
                    <Box className="flex-1">
                      <Text className="text-sm font-semibold text-primary-800">
                        {message.guestName}
                      </Text>
                      <Text className="mt-1 text-xs uppercase tracking-[0.25em] text-primary-600/70">
                        {message.channel.toUpperCase()} • {message.receivedAt}
                      </Text>
                      <Text className="mt-2 text-sm text-typography-500">{message.summary}</Text>
                      <Box className="mt-3 rounded-2xl border border-primary-100/40 bg-primary-50/70 px-4 py-3 text-xs text-primary-700">
                        Suggerimento AI → {message.aiSuggestedReply}
                      </Box>
                    </Box>
                    <Text
                      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                        message.urgency === 'alta'
                          ? 'text-error-500'
                          : message.urgency === 'media'
                            ? 'text-warning-500'
                            : 'text-success-500'
                      }`}
                    >
                      {message.urgency}
                    </Text>
                  </HStack>
                </Box>
              </Link>
            ))}
          </VStack>
        </Box>

        <Box className="flex w-full max-w-xl flex-col gap-6">
          <Box className="glass-panel rounded-3xl px-7 py-7">
            <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">
              Insight dinamici
            </Text>
            <VStack space="md" className="mt-4">
              {recentBookings.map((booking) => (
                <AIInsight key={booking.id} booking={booking} />
              ))}
            </VStack>
          </Box>

          <Box className="glass-panel rounded-3xl px-7 py-7">
            <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Newsletter live</Text>
            <Text className="mt-2 text-sm text-typography-500">
              {newsletterGuests.length} ospiti iscritti. Ultimo invio: percorso “Stagione benessere”.
            </Text>
            <VStack space="sm" className="mt-4">
              {newsletterGuests.map((guest) => (
                <HStack
                  key={guest.id}
                  className="items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <Box>
                    <Text className="text-sm font-semibold text-primary-800">{guest.name}</Text>
                    <Text className="text-xs text-typography-400">{guest.email}</Text>
                  </Box>
                  <Link href={`/clients/${guest.id}`} className="text-xs font-semibold text-primary-600">
                    Apri scheda
                  </Link>
                </HStack>
              ))}
            </VStack>
            <Link href="/newsletter" className="mt-4 inline-block text-xs font-semibold text-primary-600">
              Gestisci preferenze newsletter →
            </Link>
          </Box>
        </Box>
      </HStack>

      <AutomationTimeline />
    </VStack>
  );
}

function OverviewCards() {
  return (
    <Box className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {overviewCards.map((card) => (
        <Box key={card.label} className="glass-panel rounded-3xl px-7 py-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-typography-400/80">{card.label}</Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">{card.value}</Text>
          <Text className="text-xs text-typography-400">{card.trend}</Text>
        </Box>
      ))}
    </Box>
  );
}

function AIInsight({ booking }: { booking: Booking }) {
  return (
    <Box className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <Text className="text-sm font-semibold text-primary-800">{booking.guestName}</Text>
      <Text className="text-xs uppercase tracking-[0.2em] text-primary-600/70">
        {booking.status.toUpperCase()} • {booking.stayPeriod}
      </Text>
      <Text className="mt-2 text-sm text-typography-500">{booking.aiInsights[0]}</Text>
      <HStack className="mt-3 flex-wrap gap-2">
        {booking.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-primary-100/60 bg-primary-50/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-700"
          >
            {tag}
          </span>
        ))}
      </HStack>
      <Link href={`/bookings/${booking.id}`} className="mt-3 inline-block text-xs font-semibold text-primary-600">
        Vedi dettaglio prenotazione →
      </Link>
    </Box>
  );
}

function AutomationTimeline() {
  const steps = bookings[0].automation;

  return (
    <Box className="glass-panel rounded-3xl px-7 py-8">
      <HStack className="items-start justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Workflow del giorno</Text>
          <Text className="mt-2 text-2xl font-semibold text-primary-900">
            Prenotazione {bookings[0].reference} • Suite Aurora
          </Text>
          <Text className="mt-2 text-sm text-typography-500">
            Supervisione attiva: 4 passi completati, 2 in attesa di conferma operatore. IoT collegato: Clima Suite, Frigobar.
          </Text>
        </Box>
        <Link href={`/bookings/${bookings[0].id}`} className="text-xs font-semibold text-primary-600">
          Apri dettagli →
        </Link>
      </HStack>

      <Divider className="my-6 border-white/15" />

      <Box className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <Box key={step.id} className="rounded-2xl border border-white/12 bg-white/5 px-5 py-4">
            <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">
              {step.channel.toUpperCase()} • {step.scheduledAt}
            </Text>
            <Text className="mt-1 text-sm font-semibold text-primary-900">{step.label}</Text>
            <Text className="mt-2 text-xs text-typography-400">{step.description}</Text>
            <Text
              className={`mt-3 inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                step.status === 'completato'
                  ? 'bg-success-500/20 text-success-500'
                  : step.status === 'manuale'
                    ? 'bg-warning-500/20 text-warning-600'
                    : 'bg-primary-500/15 text-primary-700'
              }`}
            >
              {step.status}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

