'use client';

import {
  Box,
  Button,
  ButtonText,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import { Check } from 'lucide-react';

const recoverySteps = [
  'Email dinamica con alternative date',
  'SMS con codice esclusivo',
  'Promemoria WhatsApp dopo 24h',
  'Chiamata concierge dedicata',
];

export default function LostBookingPage() {
  return (
    <VStack gap="$10">
      <VStack gap="$2">
        <Heading size="2xl" color="$background50">
          Nuova Automazione Riconquista
        </Heading>
        <Text color="rgba(226,235,255,0.7)">
          Trasforma una prenotazione persa in un’opportunità con un percorso multicanale.
        </Text>
      </VStack>
      <HStack gap="$6" flexWrap="wrap" alignItems="flex-start">
        <Box flex={2} minWidth="320px" borderRadius="$xl" borderWidth={1} borderColor="rgba(255,255,255,0.18)" bgColor="rgba(13,24,41,0.55)" p="$6" style={{ backdropFilter: 'blur(18px)' }}>
          <Heading size="lg" color="$background50" mb="$4">
            Dati richiedente
          </Heading>
          <VStack gap="$4">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Cliente o azienda</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField placeholder="Giovanni Greco / Agenzia" color="$background50" />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Motivo perdita</FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput placeholder="Es. Budget superato, preferenza per struttura con spa inclusa..." />
              </Textarea>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Valore stimato</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField placeholder="€ 1.200" color="$background50" />
              </Input>
            </FormControl>
          </VStack>
        </Box>
        <Box flex={3} minWidth="320px" borderRadius="$xl" borderWidth={1} borderColor="rgba(255,255,255,0.18)" bgColor="rgba(13,24,41,0.55)" p="$6" style={{ backdropFilter: 'blur(18px)' }}>
          <Heading size="lg" color="$background50" mb="$4">
            Flusso automazione
          </Heading>
          <VStack gap="$4">
            {recoverySteps.map((step) => (
              <Checkbox key={step} defaultIsChecked value={step} accessibilityRole="checkbox">
                <CheckboxIndicator borderColor="rgba(255,255,255,0.25)">
                  <CheckboxIcon as={Check} color="$background50" />
                </CheckboxIndicator>
                <CheckboxLabel color="$background50" ml="$3">
                  {step}
                </CheckboxLabel>
              </Checkbox>
            ))}
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Messaggio personalizzato</FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput placeholder="Aggiungi una nota personale per rendere l’automazione più umana." />
              </Textarea>
            </FormControl>
            <Button size="lg">
              <ButtonText>Attiva sequenza</ButtonText>
            </Button>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
}
