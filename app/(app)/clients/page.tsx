'use client';

import { useMemo, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectIcon,
  ScrollView,
  Button
} from '@gluestack-ui/themed';
import { Search, Filter } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { ClientsTable } from '@/components/tables/ClientsTable';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { palette } from '@/theme/palette';

export default function ClientsPage() {
  const clients = useAppSelector((state) => state.clients.items);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'vip' | 'attivo' | 'inattivo'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
    );
    if (status !== 'all') {
      result = result.filter((client) => client.status === status);
    }
    return result;
  }, [clients, search, status]);

  return (
    <VStack space="md">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Clienti' }]} />
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight="700">
          Clienti
        </Text>
        <Button action="primary" size="md">
          Aggiungi cliente
        </Button>
      </HStack>
      <GlassPanel>
        <VStack space="md">
          <HStack space="md" flexWrap="wrap">
            <Input flex={1} minWidth={200} bg="rgba(15,23,42,0.35)" borderColor="rgba(148,163,184,0.2)">
              <Search size={16} color={palette.steel[200]} />
              <InputField
                placeholder="Cerca clienti"
                value={search}
                onChangeText={setSearch}
              />
            </Input>
            <Select selectedValue={status} onValueChange={(value: string) => setStatus(value as typeof status)}>
              <SelectTrigger minWidth={160}>
                <SelectInput placeholder="Stato" />
                <SelectIcon as={Filter} />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  <SelectItem label="Tutti" value="all" />
                  <SelectItem label="VIP" value="vip" />
                  <SelectItem label="Attivi" value="attivo" />
                  <SelectItem label="Inattivi" value="inattivo" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </HStack>
          {loading ? (
            <Text fontSize={13} color={palette.steel[200]}>
              Caricamento clienti…
            </Text>
          ) : error ? (
            <Text fontSize={13} color={palette.state.danger}>
              Errore nel recupero dati: {error}
            </Text>
          ) : filtered.length === 0 ? (
            <Text fontSize={13} color={palette.steel[200]}>
              Nessun cliente trovato. Prova a cambiare filtri o invita nuovi ospiti.
            </Text>
          ) : (
            <ScrollView horizontal maxHeight={420}>
              <ClientsTable clients={filtered} />
            </ScrollView>
          )}
        </VStack>
      </GlassPanel>
    </VStack>
  );
}
