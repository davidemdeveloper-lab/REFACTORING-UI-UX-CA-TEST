'use client';

import { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  FormControl,
  FormControlLabel,
  FormControlHelper,
  FormControlError,
  Input,
  InputField,
  Switch,
  Textarea,
  TextareaInput,
  Button
} from '@gluestack-ui/themed';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { palette } from '@/theme/palette';

export default function NewClientPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [spa, setSpa] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /.+@.+/.test(email);
  const phoneValid = phone.length >= 6;
  const canSubmit = name && emailValid && phoneValid;

  return (
    <VStack space="md">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Clienti', href: '/clients' },
          { label: 'Nuovo cliente' }
        ]}
      />
      <Text fontSize={24} fontWeight="700">
        Aggiungi cliente
      </Text>
      <GlassPanel>
        <VStack as="form" space="md" aria-label="Modulo nuovo cliente">
          <FormControl isRequired isInvalid={submitted && !name}>
            <FormControlLabel>
              <Text>Nome completo</Text>
            </FormControlLabel>
            <Input>
              <InputField value={name} onChangeText={setName} placeholder="Es. Giovanni Greco" />
            </Input>
            {submitted && !name ? (
              <FormControlError>
                <Text color={palette.state.danger}>Il nome è obbligatorio.</Text>
              </FormControlError>
            ) : (
              <FormControlHelper>
                <Text fontSize={12}>Utilizza nome e cognome per una comunicazione più personale.</Text>
              </FormControlHelper>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={submitted && !emailValid}>
            <FormControlLabel>
              <Text>Email</Text>
            </FormControlLabel>
            <Input>
              <InputField value={email} onChangeText={setEmail} placeholder="ospite@email.com" inputMode="email" />
            </Input>
            {submitted && !emailValid ? (
              <FormControlError>
                <Text color={palette.state.danger}>Inserisci un indirizzo email valido.</Text>
              </FormControlError>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={submitted && !phoneValid}>
            <FormControlLabel>
              <Text>Telefono</Text>
            </FormControlLabel>
            <Input>
              <InputField value={phone} onChangeText={setPhone} placeholder="Es. +39 333 111 2233" inputMode="tel" />
            </Input>
            {submitted && !phoneValid ? (
              <FormControlError>
                <Text color={palette.state.danger}>Il numero deve contenere almeno 6 caratteri.</Text>
              </FormControlError>
            ) : null}
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <Text>Note</Text>
            </FormControlLabel>
            <Textarea>
              <TextareaInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Preferenze, richieste speciali o interessi"
              />
            </Textarea>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <Text>Iscrizione percorso SPA</Text>
            </FormControlLabel>
            <Switch
              value={spa}
              onValueChange={setSpa}
              accessibilityLabel="Iscrizione percorso SPA"
            />
            <FormControlHelper>
              <Text fontSize={12}>
                Se attivo, il cliente riceverà campagne dedicate al benessere e promozioni MADIP.
              </Text>
            </FormControlHelper>
          </FormControl>
          <HStack justifyContent="flex-end" space="sm">
            <Button variant="outline" onPress={() => setSubmitted(false)}>
              Annulla
            </Button>
            <Button
              action="primary"
              onPress={() => {
                setSubmitted(true);
                if (canSubmit) {
                  alert('Cliente creato (mock)');
                }
              }}
            >
              Salva cliente
            </Button>
          </HStack>
        </VStack>
      </GlassPanel>
    </VStack>
  );
}
