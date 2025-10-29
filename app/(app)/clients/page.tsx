import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { GlassCard } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { StatusPill } from '@/components/common/status-pill';
import { clients } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { CalendarClock, MailPlus, Search, Sparkles, Users } from 'lucide-react-native';

export default function ClientsPage() {
  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Clienti e relazioni"
        subtitle="Gestisci preferenze, note sensibili e adesioni per personalizzare ogni interazione."
        actions={
          <Link href="/newsletter">
            <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
              <MailPlus color="rgb(var(--color-typography-0))" size={18} />
              <ButtonText className="font-semibold text-typography-0">Gestisci newsletter</ButtonText>
            </Button>
          </Link>
        }
      />

      <GlassCard className="flex flex-col gap-4 bg-background-0/40 p-6">
        <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input className="flex-1 rounded-2xl border-white/10 bg-background-0/40" size="lg">
            <InputSlot>
              <InputIcon as={Search} color="rgb(var(--color-typography-400))" size={18} />
            </InputSlot>
            <InputField placeholder="Cerca per nome, email o tag" placeholderTextColor="rgba(226,231,245,0.6)" />
          </Input>
          <Box className="flex flex-wrap items-center gap-3">
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <Sparkles color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Suggerimenti AI</ButtonText>
            </Button>
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <Users color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Segmenti dinamici</ButtonText>
            </Button>
          </Box>
        </Box>
        <Box className="flex flex-wrap gap-3 text-xs text-typography-300">
          <StatusPill label="VIP" tone="success" />
          <StatusPill label="Newsletter attiva" tone="info" />
          <StatusPill label="Nota prioritaria" tone="warning" />
        </Box>
      </GlassCard>

      <Box className="grid gap-4">
        {clients.map((client) => (
          <GlassCard key={client.id} padding="p-6" className="bg-background-0/40">
            <Box className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <Box className="flex items-start gap-4">
                <Box className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${client.avatarColor}`}>
                  <Text className="text-lg font-semibold text-typography-0">{client.fullName.split(' ')[0][0]}</Text>
                </Box>
                <Box className="gap-2">
                  <Text className="text-lg font-semibold text-typography-0">{client.fullName}</Text>
                  <Text className="text-sm text-typography-300">{client.email}</Text>
                  <Text className="text-sm text-typography-300">{client.phone}</Text>
                  <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
                    <StatusPill label={`Loyalty ${client.loyaltyTier}`} tone="success" />
                    <StatusPill label={`${client.staysCount} soggiorni`} tone="neutral" />
                    <StatusPill
                      label={client.newsletter ? 'Newsletter attiva' : 'Newsletter off'}
                      tone={client.newsletter ? 'info' : 'warning'}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="items-end text-right text-sm text-typography-300">
                <Text>{formatCurrency(client.totalRevenue)}</Text>
                {client.upcomingReservationId ? (
                  <Link
                    href={`/reservations/${client.upcomingReservationId}`}
                    className="mt-1 inline-flex items-center gap-2 text-xs text-primary-400"
                  >
                    <CalendarClock color="rgb(var(--color-primary-500))" size={14} /> Prossima prenotazione
                  </Link>
                ) : null}
              </Box>
            </Box>
            <Box className="mt-4 grid gap-4 md:grid-cols-2">
              <GlassCard padding="p-4" className="bg-background-0/30">
                <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Preferenze</Text>
                <Box className="mt-3 flex flex-col gap-2 text-sm text-typography-200">
                  {client.preferences.map((preference) => (
                    <Text key={preference.label}>• {preference.label}: {preference.value}</Text>
                  ))}
                </Box>
              </GlassCard>
              <GlassCard padding="p-4" className="bg-background-0/30">
                <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Note</Text>
                <Box className="mt-3 flex flex-col gap-3 text-sm text-typography-200">
                  {client.notes.map((note) => (
                    <Box key={note.id} className="rounded-2xl border border-white/10 bg-background-0/30 p-3">
                      <Text className="text-xs uppercase tracking-[0.2em] text-typography-400">{note.author}</Text>
                      <Text className="text-xs text-typography-300">{note.createdAt}</Text>
                      <Text className="mt-2 text-sm text-typography-0">{note.content}</Text>
                    </Box>
                  ))}
                </Box>
              </GlassCard>
            </Box>
            <Box className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Text className="text-sm text-typography-300">
                {client.newsletter
                  ? 'Riceve newsletter esperienziale e follow-up post soggiorno.'
                  : 'Newsletter disattivata. Suggerisci incentive personalizzati.'}
              </Text>
              <Link href={`/clients/${client.id}`}>
                <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-2">
                  <ButtonText className="text-sm font-semibold text-typography-0">Apri profilo</ButtonText>
                </Button>
              </Link>
            </Box>
          </GlassCard>
        ))}
      </Box>
    </Box>
  );
}
