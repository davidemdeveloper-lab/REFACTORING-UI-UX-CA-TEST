'use client';

import { useState } from 'react';
import {
  VStack,
  Heading,
  Text,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  Button,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Switch,
  Box,
} from '@gluestack-ui/themed';
import { GlassCard } from '@/components/common/GlassCard';

const reasonOptions = ['Prezzo non competitivo', 'Servizi mancanti', 'Mancato pagamento', 'Altro'];

export default function NewLostBookingPage() {
  const [reason, setReason] = useState(reasonOptions[0]);
  const [followUp, setFollowUp] = useState(true);

  return (
    <VStack space="xl">
      <Heading size="lg" color="white">
        Registra Prenotazione Persa
      </Heading>
      <GlassCard>
        <VStack space="xl">
          <Heading size="md" color="white">
            Dati prenotazione
          </Heading>
          <VStack space="md">
            <Field label="Cliente" placeholder="Nome e Cognome" />
            <Field label="Contatto" placeholder="Email o telefono" />
            <Field label="Periodo richiesto" placeholder="10-13 marzo 2025" />
            <Field label="Valore preventivato" placeholder="€ 780" />
          </VStack>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText color="rgba(226,232,240,0.95)">
                Motivo principale
              </FormControlLabelText>
            </FormControlLabel>
            <Box display="flex" gap={12} flexWrap="wrap">
              {reasonOptions.map((option) => (
                <Button
                  key={option}
                  variant={option === reason ? 'solid' : 'outline'}
                  bg={option === reason ? 'rgba(248,113,113,0.88)' : 'rgba(255,255,255,0.05)'}
                  borderColor={option === reason ? 'transparent' : 'rgba(255,255,255,0.18)'}
                  px="$4"
                  py="$3"
                  onPress={() => setReason(option)}
                >
                  <Text color="white" fontWeight="$semibold">
                    {option}
                  </Text>
                </Button>
              ))}
            </Box>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText color="rgba(226,232,240,0.95)">
                Azioni intraprese
              </FormControlLabelText>
            </FormControlLabel>
            <Textarea
              bg="rgba(255,255,255,0.05)"
              borderColor="rgba(255,255,255,0.18)"
              rounded="$xl"
              px="$4"
              py="$3"
            >
              <TextareaInput
                placeholder="Es. inviata proposta alternativa con upgrade gratuito, offerto codice sconto futuro..."
                color="rgba(226,232,240,0.92)"
                numberOfLines={3}
              />
            </Textarea>
          </FormControl>
          <FormControl>
            <Box display="flex" alignItems="center" gap={12}>
              <Switch value={followUp} onToggle={setFollowUp} />
              <Text color="rgba(226,232,240,0.95)">
                Pianifica follow-up automatico fra 14 giorni
              </Text>
            </Box>
          </FormControl>
          <Button
            alignSelf="flex-end"
            bg="rgba(248,113,113,0.9)"
            borderColor="transparent"
            px="$6"
            py="$3"
            rounded="$xl"
          >
            <Text color="white" fontWeight="$semibold">
              Registra prenotazione persa
            </Text>
          </Button>
        </VStack>
      </GlassCard>
    </VStack>
  );
}

const Field = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <FormControl>
    <FormControlLabel>
      <FormControlLabelText color="rgba(226,232,240,0.95)">{label}</FormControlLabelText>
    </FormControlLabel>
    <Input
      bg="rgba(255,255,255,0.05)"
      borderColor="rgba(255,255,255,0.18)"
      rounded="$xl"
      px="$4"
      py="$3"
    >
      <InputField placeholder={placeholder} color="rgba(226,232,240,0.92)" />
    </Input>
  </FormControl>
);
