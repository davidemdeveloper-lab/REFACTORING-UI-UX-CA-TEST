'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { CalendarDays, Search, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/clients': 'Gestione Clienti',
  '/clients/new': 'Accogli Cliente',
  '/bookings': 'Prenotazioni',
  '/bookings/new-lost': 'Recupero Prenotazione Persa',
  '/templates': 'Template Email',
  '/chat': 'Conversazioni',
  '/notifications': 'Centro Notifiche',
  '/iot': 'Hub IoT',
};

export function TopBar() {
  const pathname = usePathname();
  const title = useMemo(() => {
    const entry = Object.entries(titles).find(([path]) => pathname === path);
    if (entry) return entry[1];
    if (pathname.startsWith('/clients/')) return 'Scheda Cliente';
    if (pathname.startsWith('/bookings/')) return 'Dettaglio Prenotazione';
    if (pathname.startsWith('/templates/')) return 'Editor Template';
    return 'Customer Automator';
  }, [pathname]);

  const subtitle = useMemo(() => {
    if (pathname === '/dashboard') {
      return 'Panoramica in tempo reale di clienti, prenotazioni e performance automazioni.';
    }
    if (pathname.startsWith('/clients')) {
      return 'Monitora la relazione con gli ospiti e personalizza le loro esperienze.';
    }
    if (pathname.startsWith('/bookings')) {
      return 'Gestisci il ciclo di vita della prenotazione, dalla proposta al follow-up.';
    }
    if (pathname.startsWith('/templates')) {
      return 'Progetta comunicazioni magnetiche e sempre coerenti con il tuo brand.';
    }
    if (pathname.startsWith('/chat')) {
      return 'Coordina team e ospiti con conversazioni contestuali.';
    }
    if (pathname.startsWith('/notifications')) {
      return 'Centralizza alert e suggerimenti operativi generati dalla piattaforma.';
    }
    if (pathname.startsWith('/iot')) {
      return 'Tieni sotto controllo i dispositivi connessi dell’hotel.';
    }
    return 'Automatizza l’ospitalità con un tocco umano e dati in tempo reale.';
  }, [pathname]);

  const today = useMemo(
    () => format(new Date(), "EEEE d MMMM yyyy '•' HH:mm", { locale: it }),
    []
  );

  return (
    <Box className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 px-8 py-5 backdrop-blur-xl">
      <Box className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CalendarDays className="h-4 w-4 text-amber-300" />
          <span>{today}</span>
        </div>
        <div className="flex items-center gap-4">
          <Text className="text-2xl font-semibold text-white">{title}</Text>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.32em] text-slate-300">
            Customer Automator
          </span>
        </div>
        <Text className="max-w-2xl text-sm text-slate-300">{subtitle}</Text>
      </Box>

      <Box className="flex items-center gap-4">
        <Input
          size="lg"
          variant="outline"
          className="h-12 w-[280px] rounded-xl border-white/15 bg-white/5"
        >
          <InputSlot>
            <InputIcon as={Search} className="text-slate-300" />
          </InputSlot>
          <InputField placeholder="Cerca clienti, prenotazioni o conversazioni" placeholderTextColor="#94a3b8" />
        </Input>
        <Link href="/bookings/new-lost">
          <Button
            action="primary"
            variant="solid"
            size="md"
            className="h-12 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 shadow-[0_18px_45px_rgba(251,191,36,0.45)]"
          >
            <ButtonIcon as={Plus} className="text-slate-900" size="sm" />
            <ButtonText className="font-semibold uppercase tracking-[0.2em] text-slate-900">
              Nuova Prenotazione
            </ButtonText>
          </Button>
        </Link>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">Davide Minerva</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Guest Experience Lead</p>
          </div>
          <Avatar size="md" className="bg-amber-500/80">
            <AvatarFallbackText>DM</AvatarFallbackText>
          </Avatar>
        </div>
      </Box>
    </Box>
  );
}
