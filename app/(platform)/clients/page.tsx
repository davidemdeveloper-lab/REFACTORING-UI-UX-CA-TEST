import Link from 'next/link';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/input-field';
import { InputIcon } from '@/components/ui/input/input-icon';
import { InputSlot } from '@/components/ui/input/input-slot';
import { Pressable } from '@/components/ui/pressable';
import { palette } from '@/theme/palette';
import { guests } from '@/lib/mock-data';
import { Search, Filter, ArrowRight, Star } from 'lucide-react-native';

export default function ClientsPage() {
  return (
    <VStack className="gap-8">
      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title="Clienti"
          subtitle="Segmenta ospiti e aggiorna comunicazioni"
          action={
            <Link href="/clients/add" className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Text className="text-sm font-semibold text-white">Aggiungi cliente</Text>
            </Link>
          }
        />
        <HStack className="flex-col gap-4 lg:flex-row">
          <Input className="flex-1 rounded-full border-white/10 bg-white/5 px-4" size="lg">
            <InputSlot className="pl-3">
              <InputIcon>
                <Search color={palette.text.secondary} size={18} strokeWidth={1.6} />
              </InputIcon>
            </InputSlot>
            <InputField
              placeholder="Cerca per nome, email o preferenza"
              placeholderTextColor="rgba(226,232,240,0.6)"
              style={{ color: palette.text.primary }}
            />
          </Input>
          <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3">
            <Filter color={palette.text.secondary} size={18} strokeWidth={1.5} />
            <Text className="text-sm text-slate-200">Filtri avanzati</Text>
          </Pressable>
        </HStack>
        <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Segmenti dinamici basati su automazioni e preferenze
        </Text>
      </GlassCard>

      <GlassCard className="gap-4 border-white/10 bg-white/5">
        <VStack className="gap-3">
          {guests.map((guest) => (
            <HStack
              key={guest.id}
              className="items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <VStack className="gap-2">
                <HStack className="items-center gap-2">
                  <Text className="text-lg font-semibold text-white">{guest.name}</Text>
                  <Text className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                    {guest.loyaltyTier}
                  </Text>
                </HStack>
                <Text className="text-sm text-slate-400">{guest.email}</Text>
                <HStack className="flex-wrap gap-2">
                  {guest.preferences.map((pref) => (
                    <Text
                      key={pref}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {pref}
                    </Text>
                  ))}
                </HStack>
              </VStack>
              <VStack className="items-end gap-2">
                <Text className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Ultimo soggiorno {new Date(guest.lastStay).toLocaleDateString('it-IT')}
                </Text>
                <HStack className="items-center gap-2">
                  <Star color={palette.intent.accent} size={16} strokeWidth={1.5} />
                  <Text className="text-sm text-slate-200">Automation score {guest.automationScore}</Text>
                </HStack>
                <Link
                  href={`/clients/${guest.id}`}
                  className="flex-row items-center gap-2 rounded-full border border-white/15 px-3 py-2"
                >
                  <Text className="text-xs font-semibold text-white">Apri scheda</Text>
                  <ArrowRight color={palette.text.secondary} size={14} strokeWidth={1.3} />
                </Link>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </GlassCard>
    </VStack>
  );
}
