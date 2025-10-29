'use client';

import { ReactNode } from 'react';
import { palette } from '@/theme/palette';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { StatusPill } from '@/components/design-system/StatusPill';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@/components/ui/select';
import { Button, ButtonText } from '@/components/ui/button';
import { Sparkles, UserPlus } from 'lucide-react-native';

const roomTypes = ['Suite Panoramica', 'Junior Suite', 'Camera Deluxe', 'Camera Executive'];
const communicationTypes = ['Email automatica', 'Chat AI', 'Chiamata programmata'];

export default function AddClientPage() {
  return (
    <VStack space="xl">
      <SectionHeading
        title="Accogli un nuovo cliente"
        subtitle="Compila dati anagrafici, preferenze e automazioni suggerite"
        icon={<UserPlus size={20} color={palette.accentPrimary} />}
        action={<StatusPill label="Workflow rapido 3 step" tone="accent" />}
      />

      <MetalGlassCard padding={24}>
        <VStack space="xl">
          <StepCard title="Anagrafica e contatti" description="Informazioni base del cliente e riferimenti principali.">
            <HStack gap={20} flexWrap="wrap">
              <FormField label="Nome">
                <Input variant="outline" bg="rgba(8,15,28,0.65)" borderRadius={18}>
                  <InputField placeholder="Nome" />
                </Input>
              </FormField>
              <FormField label="Cognome">
                <Input variant="outline" bg="rgba(8,15,28,0.65)" borderRadius={18}>
                  <InputField placeholder="Cognome" />
                </Input>
              </FormField>
              <FormField label="Email">
                <Input variant="outline" bg="rgba(8,15,28,0.65)" borderRadius={18}>
                  <InputField placeholder="email@cliente.com" />
                </Input>
              </FormField>
              <FormField label="Telefono">
                <Input variant="outline" bg="rgba(8,15,28,0.65)" borderRadius={18}>
                  <InputField placeholder="+39" />
                </Input>
              </FormField>
            </HStack>
          </StepCard>

          <StepCard
            title="Preferenze soggiorno"
            description="Scegli camera ideale, note personalizzate e canale di comunicazione preferito."
          >
            <HStack gap={20} flexWrap="wrap">
              <FormField label="Tipologia camera">
                <Select>
                  <SelectTrigger
                    variant="outline"
                    bg="rgba(8,15,28,0.65)"
                    borderColor="rgba(56,189,248,0.25)"
                    borderRadius={18}
                  >
                    <SelectInput placeholder="Seleziona" />
                    <SelectIcon mr="$2">
                      <Sparkles size={16} color={palette.accentPrimary} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      {roomTypes.map((room) => (
                        <SelectItem key={room} label={room} value={room} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormField>
              <FormField label="Channel preferito">
                <Select>
                  <SelectTrigger
                    variant="outline"
                    bg="rgba(8,15,28,0.65)"
                    borderColor="rgba(56,189,248,0.25)"
                    borderRadius={18}
                  >
                    <SelectInput placeholder="Seleziona" />
                    <SelectIcon mr="$2">
                      <Sparkles size={16} color={palette.accentPrimary} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      {communicationTypes.map((type) => (
                        <SelectItem key={type} label={type} value={type} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormField>
            </HStack>
            <FormField label="Note personalizzate">
              <Textarea bg="rgba(8,15,28,0.65)" borderColor="rgba(56,189,248,0.2)" borderRadius={16}>
                <TextareaInput placeholder="Es. allergie, esigenze particolari, ricorrenze..." />
              </Textarea>
            </FormField>
          </StepCard>

          <StepCard
            title="Automazioni suggerite"
            description="Definisci template email, reminder e attivazioni IoT da associare al cliente."
          >
            <VStack space="md">
              <HStack gap={12} flexWrap="wrap">
                <StatusPill label="Email pre-arrivo smart" tone="accent" />
                <StatusPill label="Promo SPA dedicata" tone="success" />
                <StatusPill label="Welcome chat AI" tone="accent" />
              </HStack>
              <Text fontSize={13} color={palette.textSecondary}>
                Customer Automator suggerisce l’invio automatico 72h prima del check-in con template dinamico e
                notifiche IoT su temperatura camera.
              </Text>
            </VStack>
          </StepCard>

          <HStack justifyContent="flex-end" gap={12}>
            <Button variant="outline" borderColor="rgba(148,163,184,0.35)" borderRadius={14}>
              <ButtonText color={palette.textSecondary}>Salva come bozza</ButtonText>
            </Button>
            <Button variant="solid" bg={palette.accentPrimary} borderRadius={14}>
              <ButtonText color="#020617">Invia benvenuto automatico</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </MetalGlassCard>
    </VStack>
  );
}

interface StepCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

function StepCard({ title, description, children }: StepCardProps) {
  return (
    <VStack space="md">
      <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
        {title}
      </Text>
      <Text fontSize={13} color={palette.textSecondary}>
        {description}
      </Text>
      <Box
        borderRadius={18}
        px={20}
        py={18}
        bg="rgba(15,23,42,0.55)"
        borderWidth={1}
        borderColor="rgba(56,189,248,0.18)"
      >
        <VStack space="md">{children}</VStack>
      </Box>
    </VStack>
  );
}

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <VStack space="xs" minW={200} flex={1}>
      <Text fontSize={12} fontWeight="600" color={palette.textMuted}>
        {label}
      </Text>
      {children}
    </VStack>
  );
}

// Validazione: form aggiungi cliente strutturato in step, CTA chiare e campi accessibili.
