'use client';

import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  Button,
  Switch,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@gluestack-ui/themed';
import { GlassCard } from '@/components/common/GlassCard';

const welcomeOptions = ['Invio Proposta', 'Pagamento Online', 'Pagamento In Manuale'];

export default function NewClientPage() {
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);
  const [selectedWelcome, setSelectedWelcome] = useState(welcomeOptions[0]);

  return (
    <VStack space="xl">
      <Heading size="lg" color="white">
        Accogli Cliente
      </Heading>
      <GlassCard>
        <VStack space="xl">
          <Heading size="md" color="white">
            Informazioni Cliente
          </Heading>
          <HStack space="lg" flexWrap="wrap">
            <InputFieldControl label="Nome" placeholder="Nome" />
            <InputFieldControl label="Cognome" placeholder="Cognome" />
            <InputFieldControl label="Telefono" placeholder="Telefono" />
            <InputFieldControl label="Email" placeholder="Email" keyboardType="email-address" />
          </HStack>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText color="rgba(226, 232, 240, 0.95)">
                Note ospite
              </FormControlLabelText>
            </FormControlLabel>
            <Textarea
              bg="rgba(255, 255, 255, 0.05)"
              borderColor="rgba(255, 255, 255, 0.18)"
              rounded="$xl"
              px="$4"
              py="$3"
            >
              <TextareaInput
                placeholder="Preferenze, allergie, esigenze di check-in..."
                color="rgba(226, 232, 240, 0.92)"
                numberOfLines={3}
              />
            </Textarea>
          </FormControl>
        </VStack>
      </GlassCard>

      <GlassCard>
        <VStack space="xl">
          <Heading size="md" color="white">
            Dettagli Prenotazione
          </Heading>
          <HStack space="lg" flexWrap="wrap">
            <InputFieldControl label="Data Check-in" placeholder="2025-03-14" />
            <InputFieldControl label="Data Check-out" placeholder="2025-03-16" />
            <InputFieldControl label="Tipologia Camera" placeholder="Suite Skyline" />
            <InputFieldControl label="Valore preventivo" placeholder="€ 980" />
          </HStack>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText color="rgba(226, 232, 240, 0.95)">
                Tipo accoglienza cliente
              </FormControlLabelText>
            </FormControlLabel>
            <Box display="flex" flexWrap="wrap" gap={12}>
              {welcomeOptions.map((option) => (
                <Button
                  key={option}
                  variant={option === selectedWelcome ? 'solid' : 'outline'}
                  bg={option === selectedWelcome ? 'rgba(79, 140, 255, 0.9)' : 'rgba(255, 255, 255, 0.05)'}
                  borderColor={option === selectedWelcome ? 'transparent' : 'rgba(255, 255, 255, 0.18)'}
                  px="$4"
                  py="$3"
                  onPress={() => setSelectedWelcome(option)}
                >
                  <Text color="white" fontWeight="$semibold">
                    {option}
                  </Text>
                </Button>
              ))}
            </Box>
          </FormControl>
          <FormControl>
            <HStack space="md" alignItems="center">
              <Switch value={newsletterOptIn} onToggle={setNewsletterOptIn} size="md" />
              <Text color="rgba(226, 232, 240, 0.95)">
                Iscrivi il cliente alla newsletter di benvenuto
              </Text>
            </HStack>
          </FormControl>
          <Button
            alignSelf="flex-end"
            bg="rgba(79, 140, 255, 0.9)"
            borderColor="transparent"
            px="$6"
            py="$3"
            rounded="$xl"
          >
            <Text color="white" fontWeight="$semibold">
              Invia Offerta al Cliente
            </Text>
          </Button>
        </VStack>
      </GlassCard>
    </VStack>
  );
}

const InputFieldControl = ({
  label,
  placeholder,
  keyboardType,
}: {
  label: string;
  placeholder: string;
  keyboardType?: string;
}) => (
  <FormControl flexBasis="260px" flexGrow={1}>
    <FormControlLabel>
      <FormControlLabelText color="rgba(226, 232, 240, 0.95)">{label}</FormControlLabelText>
    </FormControlLabel>
    <Input
      bg="rgba(255, 255, 255, 0.05)"
      borderColor="rgba(255, 255, 255, 0.18)"
      rounded="$xl"
      px="$4"
      py="$3"
    >
      <InputField
        placeholder={placeholder}
        color="rgba(226, 232, 240, 0.92)"
        keyboardType={keyboardType}
      />
    </Input>
  </FormControl>
);
