'use client';

import { useState } from 'react';
import {
  VStack,
  Text,
  FormControl,
  FormControlLabel,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectContent,
  SelectItem,
  Textarea,
  TextareaInput,
  Button
} from '@gluestack-ui/themed';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';

const reasons = [
  { label: 'Prezzo più basso altrove', value: 'prezzo' },
  { label: 'Servizi non disponibili', value: 'servizi' },
  { label: 'Tempi di risposta lunghi', value: 'tempi' },
  { label: 'Altro', value: 'altro' }
];

export default function LostBookingPage() {
  const [client, setClient] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <VStack space="md">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Prenotazioni', href: '/bookings' },
          { label: 'Booking perso' }
        ]}
      />
      <Text fontSize={24} fontWeight="700">
        Segnala prenotazione persa
      </Text>
      <GlassPanel>
        <VStack space="md">
          <FormControl isRequired>
            <FormControlLabel>
              <Text>Cliente</Text>
            </FormControlLabel>
            <Input>
              <InputField value={client} onChangeText={setClient} placeholder="ID cliente o nome" />
            </Input>
          </FormControl>
          <FormControl isRequired>
            <FormControlLabel>
              <Text>Motivo principale</Text>
            </FormControlLabel>
            <Select selectedValue={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectInput placeholder="Seleziona motivo" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  {reasons.map((option) => (
                    <SelectItem key={option.value} value={option.value} label={option.label} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <Text>Note aggiuntive</Text>
            </FormControlLabel>
            <Textarea>
              <TextareaInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Aggiungi dettagli, follow-up programmati o prossime azioni"
              />
            </Textarea>
          </FormControl>
          <Button action="primary" onPress={() => alert('Booking perso registrato (mock)')}>
            Registra perdita
          </Button>
        </VStack>
      </GlassPanel>
    </VStack>
  );
}
