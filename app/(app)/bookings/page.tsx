'use client';

import { useMemo, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectIcon,
  Button,
  ScrollView
} from '@gluestack-ui/themed';
import { Filter, Plus } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { BookingsTable } from '@/components/tables/BookingsTable';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';

export default function BookingsPage() {
  const bookings = useAppSelector((state) => state.bookings.items);
  const [status, setStatus] = useState<'tutti' | 'nuovo' | 'confermato' | 'check-in' | 'check-out' | 'perso'>(
    'tutti'
  );

  const filtered = useMemo(() => {
    if (status === 'tutti') return bookings;
    return bookings.filter((booking) => booking.status === status);
  }, [bookings, status]);

  return (
    <VStack space="md">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Prenotazioni' }]} />
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight="700">
          Prenotazioni
        </Text>
        <HStack space="sm">
          <Button variant="outline" leftIcon={Plus}>
            Nuova prenotazione (mock)
          </Button>
          <Button action="primary" leftIcon={Plus}>
            Segnala booking perso
          </Button>
        </HStack>
      </HStack>
      <GlassPanel>
        <VStack space="md">
          <HStack justifyContent="flex-end">
            <Select selectedValue={status} onValueChange={(value: string) => setStatus(value as typeof status)}>
              <SelectTrigger minWidth={160}>
                <SelectInput placeholder="Stato" />
                <SelectIcon as={Filter} />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  <SelectItem label="Tutte" value="tutti" />
                  <SelectItem label="Nuove" value="nuovo" />
                  <SelectItem label="Confermate" value="confermato" />
                  <SelectItem label="Check-in" value="check-in" />
                  <SelectItem label="Check-out" value="check-out" />
                  <SelectItem label="Perse" value="perso" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </HStack>
          {filtered.length === 0 ? (
            <Text fontSize={13}>
              Nessuna prenotazione corrispondente. Prova un altro filtro.
            </Text>
          ) : (
            <ScrollView horizontal maxHeight={420}>
              <BookingsTable bookings={filtered} />
            </ScrollView>
          )}
        </VStack>
      </GlassPanel>
    </VStack>
  );
}
