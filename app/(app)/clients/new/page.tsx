'use client';

import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Input,
  InputField,
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import { ChevronDown } from 'lucide-react';

const segments = ['Business', 'Leisure', 'Family', 'Event Planner'];
const automations = ['Email proposta', 'Pagamento online', 'Pre check-in', 'Upsell Spa'];

export default function NewClientPage() {
  return (
    <VStack gap="$10">
      <VStack gap="$2">
        <Heading size="2xl" color="$background50">
          Accogli Cliente
        </Heading>
        <Text color="rgba(226,235,255,0.7)">
          Registra un nuovo ospite, collega la prenotazione e attiva una sequenza di benvenuto.
        </Text>
      </VStack>
      <HStack gap="$6" flexWrap="wrap" alignItems="flex-start">
        <Box flex={1} minWidth="320px" borderRadius="$xl" borderWidth={1} borderColor="rgba(255,255,255,0.18)" bgColor="rgba(13,24,41,0.55)" p="$6" style={{ backdropFilter: 'blur(18px)' }}>
          <Heading size="lg" color="$background50" mb="$4">
            Informazioni Cliente
          </Heading>
          <VStack gap="$4">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Nome</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField placeholder="Nome" color="$background50" />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Cognome</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField placeholder="Cognome" color="$background50" />
              </Input>
            </FormControl>
            <HStack gap="$4" flexWrap="wrap">
              <FormControl flex={1} minWidth="200px">
                <FormControlLabel>
                  <FormControlLabelText>Telefono</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField placeholder="+39" color="$background50" />
                </Input>
              </FormControl>
              <FormControl flex={1} minWidth="200px">
                <FormControlLabel>
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField placeholder="esempio@mail.com" color="$background50" />
                </Input>
              </FormControl>
            </HStack>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Segmento</FormControlLabelText>
              </FormControlLabel>
              <Select>
                <SelectTrigger>
                  <SelectInput placeholder="Seleziona segmento" />
                  <SelectIcon as={ChevronDown} color="$background50" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    {segments.map((segment) => (
                      <SelectItem key={segment} label={segment} value={segment} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Note preferenze</FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput placeholder="Esempio: preferisce camera vista mare, colazione vegan..." />
              </Textarea>
            </FormControl>
          </VStack>
        </Box>
        <Box flex={1} minWidth="320px" borderRadius="$xl" borderWidth={1} borderColor="rgba(255,255,255,0.18)" bgColor="rgba(13,24,41,0.55)" p="$6" style={{ backdropFilter: 'blur(18px)' }}>
          <Heading size="lg" color="$background50" mb="$4">
            Dettagli Prenotazione
          </Heading>
          <VStack gap="$4">
            <HStack gap="$4" flexWrap="wrap">
              <FormControl flex={1} minWidth="200px">
                <FormControlLabel>
                  <FormControlLabelText>Data check-in</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField placeholder="Seleziona data" color="$background50" />
                </Input>
              </FormControl>
              <FormControl flex={1} minWidth="200px">
                <FormControlLabel>
                  <FormControlLabelText>Data check-out</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField placeholder="Seleziona data" color="$background50" />
                </Input>
              </FormControl>
            </HStack>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Automazione di benvenuto</FormControlLabelText>
              </FormControlLabel>
              <Select>
                <SelectTrigger>
                  <SelectInput placeholder="Scegli automazione" />
                  <SelectIcon as={ChevronDown} color="$background50" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    {automations.map((automation) => (
                      <SelectItem key={automation} label={automation} value={automation} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Proposta personalizzata</FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput placeholder="Es. Inviare proposta weekend gourmet + accesso spa" />
              </Textarea>
            </FormControl>
            <Button size="lg">
              <ButtonText>Invia offerta al cliente</ButtonText>
            </Button>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
}
