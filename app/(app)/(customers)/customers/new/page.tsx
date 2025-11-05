'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCustomersQuery } from '@/services/mockApi';
import { Customer } from '@/types';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { SectionCard } from '@/components/shared/section-card';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@/components/ui/radio';
import { Divider } from '@/components/ui/divider';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectTrigger,
  SelectIcon as SelectChevron,
  SelectInput,
  SelectItem,
  SelectPortal,
} from '@/components/ui/select';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import {
  BadgeCheck,
  Baby,
  CalendarRange,
  CalendarClock,
  ChevronDown,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
  Users,
  Hotel,
  FileText,
} from 'lucide-react-native';
import { ROOM_TYPES, RATE_PLANS } from '@/constants/catalogs';
type IntakeType = 'proposal' | 'online' | 'manual';

type CustomerFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
};

type ProposalRoom = {
  id: string;
  roomType: string;
  ratePlan: string;
  guests: string;
  children: string;
  notes: string;
};

type Proposal = {
  id: string;
  rooms: ProposalRoom[];
};

const EMPTY_CUSTOMER: CustomerFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  secondaryPhone: '',
};

function toCustomerForm(customer: Customer): CustomerFormState {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email ?? '',
    phone: customer.phone ?? '',
    secondaryPhone: customer.secondaryPhone ?? '',
  };
}

function createRoom(): ProposalRoom {
  return {
    id: crypto.randomUUID(),
    roomType: '',
    ratePlan: 'Tutte le tariffe',
    guests: '2',
    children: '0',
    notes: '',
  };
}

function createProposal(): Proposal {
  return {
    id: crypto.randomUUID(),
    rooms: [createRoom()],
  };
}

export default function CustomerIntakePage() {
  const router = useRouter();
  const { data: customers = [] } = useGetCustomersQuery();

  const [customerForm, setCustomerForm] = useState<CustomerFormState>(
    EMPTY_CUSTOMER
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [customerQuery, setCustomerQuery] = useState('');

  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [offerDate, setOfferDate] = useState('');

  const [intakeType, setIntakeType] = useState<IntakeType>('proposal');
  const [proposals, setProposals] = useState<Proposal[]>([createProposal()]);

  const customerSuggestions = useMemo(() => {
    const query = customerQuery.trim().toLowerCase();
    if (query.length < 2) {
      return [];
    }
    return customers
      .filter((customer) => {
        const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
        const email = customer.email?.toLowerCase() ?? '';
        return (
          fullName.includes(query) ||
          email.includes(query) ||
          customer.phone?.toLowerCase().includes(query) ||
          customer.secondaryPhone?.toLowerCase().includes(query)
        );
      })
      .slice(0, 6);
  }, [customerQuery, customers]);

  const setFormValue = (key: keyof CustomerFormState, value: string) => {
    setCustomerForm((prev) => ({ ...prev, [key]: value }));
    if (key === 'firstName' || key === 'lastName') {
      setSelectedCustomerId(null);
    }
  };

  const handleSelectCustomer = (customer: Customer) => {
    setCustomerForm(toCustomerForm(customer));
    setSelectedCustomerId(customer.id);
    setCustomerQuery(`${customer.firstName} ${customer.lastName}`);
  };

  const handleAddProposal = () => {
    setProposals((prev) => [...prev, createProposal()]);
  };

  const handleRemoveProposal = (proposalId: string) => {
    setProposals((prev) =>
      prev.length === 1 ? prev : prev.filter((proposal) => proposal.id !== proposalId)
    );
  };

  const handleAddRoom = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === proposalId
          ? { ...proposal, rooms: [...proposal.rooms, createRoom()] }
          : proposal
      )
    );
  };

  const handleRemoveRoom = (proposalId: string, roomId: string) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              rooms:
                proposal.rooms.length === 1
                  ? proposal.rooms
                  : proposal.rooms.filter((room) => room.id !== roomId),
            }
          : proposal
      )
    );
  };

  const updateRoom = (
    proposalId: string,
    roomId: string,
    partial: Partial<ProposalRoom>
  ) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              rooms: proposal.rooms.map((room) =>
                room.id === roomId ? { ...room, ...partial } : room
              ),
            }
          : proposal
      )
    );
  };

  return (
    <Box className="pb-16">
      <Box className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Box>
          <Text className="text-3xl font-semibold text-[var(--color-neutral-900)]">
            Accogli cliente
          </Text>
          <Text className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-neutral-600)]">
            Inserisci i dati del cliente, scegli il canale di accoglienza e
            costruisci una proposta con più stanze e tariffe prima di inviarla.
          </Text>
        </Box>
        <Button
          variant="outline"
          action="primary"
          size="md"
          className="rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-5"
          onPress={() => router.back()}
        >
          <Text className="text-sm font-semibold text-[var(--color-primary-600)]">
            Torna alle liste
          </Text>
        </Button>
      </Box>

      <SectionCard
        title="Informazioni cliente"
        subtitle="Compila i dati o importa un cliente esistente per velocizzare l'accoglienza."
        contentClassName="space-y-6"
      >
        <Box>
          <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-neutral-500)]">
            Cerca tra i clienti registrati
          </Text>
          <Box className="mt-3">
            <Input variant="outline" size="lg" className="rounded-2xl border-[var(--color-border)]">
              <InputSlot className="pl-4">
                <InputIcon as={Search} size="lg" />
              </InputSlot>
              <InputField
                placeholder="Digita nome, cognome, email o telefono..."
                value={customerQuery}
                onChangeText={(value) => {
                  setCustomerQuery(value);
                  if (value.length < 2) {
                    setSelectedCustomerId(null);
                  }
                }}
              />
            </Input>
          </Box>
          {customerSuggestions.length > 0 ? (
            <Box className="mt-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <Text className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                Risultati rapidi
              </Text>
              <VStack space="sm">
                {customerSuggestions.map((customer) => (
                  <Button
                    key={customer.id}
                    variant="outline"
                    action={
                      selectedCustomerId === customer.id ? 'primary' : 'secondary'
                    }
                    size="sm"
                    className={`justify-start rounded-2xl border-[var(--color-border)] px-4 ${
                      selectedCustomerId === customer.id
                        ? 'border-[var(--color-primary-500)] bg-[rgba(196,123,44,0.1)]'
                        : 'bg-[var(--color-surface)]'
                    }`}
                    onPress={() => handleSelectCustomer(customer)}
                  >
                    <HStack className="w-full items-center justify-between">
                      <Box>
                        <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                          {customer.firstName} {customer.lastName}
                        </Text>
                        <Text className="text-xs text-[var(--color-neutral-600)]">
                          {customer.email} · {customer.phone}
                        </Text>
                      </Box>
                      {selectedCustomerId === customer.id ? (
                        <BadgeCheck size={18} color="#aa6a24" />
                      ) : null}
                    </HStack>
                  </Button>
                ))}
              </VStack>
            </Box>
          ) : null}
        </Box>
        <VStack space="lg">
          <HStack className="flex-col gap-4 md:flex-row">
            <Input
              variant="outline"
              size="lg"
              className="flex-1 rounded-2xl border-[var(--color-border)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={User} size="lg" />
              </InputSlot>
              <InputField
                placeholder="Nome"
                value={customerForm.firstName}
                onChangeText={(value) => setFormValue('firstName', value)}
              />
            </Input>
            <Input
              variant="outline"
              size="lg"
              className="flex-1 rounded-2xl border-[var(--color-border)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={User} size="lg" />
              </InputSlot>
              <InputField
                placeholder="Cognome"
                value={customerForm.lastName}
                onChangeText={(value) => setFormValue('lastName', value)}
              />
            </Input>
          </HStack>
          <HStack className="flex-col gap-4 md:flex-row">
            <Input
              variant="outline"
              size="lg"
              className="flex-1 rounded-2xl border-[var(--color-border)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={Phone} size="lg" />
              </InputSlot>
              <InputField
                placeholder="Telefono principale"
                value={customerForm.phone}
                onChangeText={(value) => setFormValue('phone', value)}
              />
            </Input>
            <Input
              variant="outline"
              size="lg"
              className="flex-1 rounded-2xl border-[var(--color-border)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={Phone} size="lg" />
              </InputSlot>
              <InputField
                placeholder="Telefono secondario"
                value={customerForm.secondaryPhone}
                onChangeText={(value) => setFormValue('secondaryPhone', value)}
              />
            </Input>
          </HStack>
          <Input
            variant="outline"
            size="lg"
            className="rounded-2xl border-[var(--color-border)]"
          >
            <InputSlot className="pl-4">
              <InputIcon as={Mail} size="lg" />
            </InputSlot>
            <InputField
              placeholder="Email"
              autoCapitalize="none"
              value={customerForm.email}
              onChangeText={(value) => setFormValue('email', value)}
            />
          </Input>
        </VStack>
      </SectionCard>

      <SectionCard
        title="Dettagli prenotazione"
        subtitle="Definisci periodo d'interesse e scadenza della proposta."
        contentClassName="space-y-6"
      >
        <HStack className="flex-col gap-4 md:flex-row">
          <Input
            variant="outline"
            size="lg"
            className="flex-1 rounded-2xl border-[var(--color-border)]"
          >
            <InputSlot className="pl-4">
              <InputIcon as={CalendarRange} size="lg" />
            </InputSlot>
            <InputField
              placeholder="Data arrivo"
              value={arrivalDate}
              onChangeText={setArrivalDate}
            />
          </Input>
          <Input
            variant="outline"
            size="lg"
            className="flex-1 rounded-2xl border-[var(--color-border)]"
          >
            <InputSlot className="pl-4">
              <InputIcon as={CalendarRange} size="lg" />
            </InputSlot>
            <InputField
              placeholder="Data partenza"
              value={departureDate}
              onChangeText={setDepartureDate}
            />
          </Input>
          <Input
            variant="outline"
            size="lg"
            className="flex-1 rounded-2xl border-[var(--color-border)]"
          >
            <InputSlot className="pl-4">
              <InputIcon as={CalendarClock} size="lg" />
            </InputSlot>
            <InputField
              placeholder="Validità offerta"
              value={offerDate}
              onChangeText={setOfferDate}
            />
          </Input>
        </HStack>
        <Box className="rounded-2xl border border-[rgba(196,123,44,0.35)] bg-[rgba(196,123,44,0.08)] p-4">
          <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-600)]">
            Nota operativa
          </Text>
          <Text className="mt-1 text-sm text-[var(--color-primary-600)]">
            Le date restano bloccate fino all&apos;invio della proposta: aggiorna
            arrivo e partenza se il cliente richiede varianti.
          </Text>
        </Box>
      </SectionCard>

      <SectionCard
        title="Tipo accoglienza cliente"
        subtitle="Scegli come proseguire il flusso di comunicazione con il cliente."
      >
        <RadioGroup
          value={intakeType}
          onValueChange={(value) => setIntakeType(value as IntakeType)}
          className="flex-col gap-4 md:flex-row"
        >
          <Radio value="proposal" size="lg">
            <RadioIndicator>
              <RadioIcon as={ChevronDown} />
            </RadioIndicator>
            <RadioLabel className="text-base font-semibold text-[var(--color-neutral-800)]">
              Invio proposta
            </RadioLabel>
            <Text className="ml-8 max-w-xs text-sm leading-6 text-[var(--color-neutral-600)]">
              Email con più combinazioni di stanze e tariffe. Il cliente sceglie e
              completa il pagamento online.
            </Text>
          </Radio>
          <Radio value="online" size="lg">
            <RadioIndicator>
              <RadioIcon as={ChevronDown} />
            </RadioIndicator>
            <RadioLabel className="text-base font-semibold text-[var(--color-neutral-800)]">
              Pagamento online
            </RadioLabel>
            <Text className="ml-8 max-w-xs text-sm leading-6 text-[var(--color-neutral-600)]">
              Mandiamo subito il link di pagamento Stripe per chiudere la
              prenotazione.
            </Text>
          </Radio>
          <Radio value="manual" size="lg">
            <RadioIndicator>
              <RadioIcon as={ChevronDown} />
            </RadioIndicator>
            <RadioLabel className="text-base font-semibold text-[var(--color-neutral-800)]">
              Pagamento in struttura
            </RadioLabel>
            <Text className="ml-8 max-w-xs text-sm leading-6 text-[var(--color-neutral-600)]">
              Il cliente conferma l&apos;arrivo e pagherà al check-in con supporto del
              personale.
            </Text>
          </Radio>
        </RadioGroup>
      </SectionCard>

      <SectionCard
        title="Crea proposta"
        subtitle="Organizza più offerte e stanze per dare al cliente alternative chiare."
        contentClassName="space-y-6"
      >
        <Button
          action="primary"
          variant="outline"
          size="sm"
          className="self-start rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-background)] px-4"
          onPress={handleAddProposal}
        >
          <Plus size={16} color="#aa6a24" />
          <Text className="text-sm font-semibold text-[var(--color-primary-600)]">
            Aggiungi offerta
          </Text>
        </Button>

        <VStack space="lg">
          {proposals.map((proposal, proposalIndex) => (
            <Box
              key={proposal.id}
              className="rounded-3xl border border-[rgba(196,123,44,0.4)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]"
            >
              <HStack className="flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Text className="text-lg font-semibold text-[var(--color-primary-700)]">
                  Proposta {proposalIndex + 1}
                </Text>
                <Button
                  variant="outline"
                  action="negative"
                  size="sm"
                  className="self-start rounded-full border-[rgba(220,38,38,0.3)] bg-transparent px-4 text-sm"
                  onPress={() => handleRemoveProposal(proposal.id)}
                  isDisabled={proposals.length === 1}
                >
                  <Trash2 size={16} color="#dc2626" />
                  <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[#dc2626]">
                    Annulla offerta
                  </Text>
                </Button>
              </HStack>

              <Divider className="mt-4 mb-6 bg-[rgba(196,123,44,0.2)]" />

              <VStack space="lg">
                {proposal.rooms.map((room) => (
                  <Box
                    key={room.id}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-4"
                  >
                    <HStack className="flex-col gap-4 lg:flex-row">
                      <Select
                        selectedValue={room.roomType}
                        onValueChange={(value) =>
                          updateRoom(proposal.id, room.id, { roomType: value })
                        }
                        className="flex-1"
                      >
                        <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
                          <SelectInput placeholder="Tipologia stanza" />
                          <SelectChevron as={ChevronDown} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent className="max-h-[340px] w-full">
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {ROOM_TYPES.map((type) => (
                              <SelectItem
                                key={type}
                                label={type}
                                value={type}
                              />
                            ))}
                          </SelectContent>
                        </SelectPortal>
                      </Select>

                      <Select
                        selectedValue={room.ratePlan}
                        onValueChange={(value) =>
                          updateRoom(proposal.id, room.id, { ratePlan: value })
                        }
                        className="flex-1"
                      >
                        <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
                          <SelectInput placeholder="Tipo tariffa" />
                          <SelectChevron as={ChevronDown} />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent className="max-h-[340px] w-full">
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {RATE_PLANS.map((plan) => (
                              <SelectItem key={plan} label={plan} value={plan} />
                            ))}
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                    </HStack>

                    <HStack className="mt-4 flex-col gap-4 lg:flex-row">
                      <Input
                        variant="outline"
                        size="md"
                        className="flex-1 rounded-2xl border-[var(--color-border)]"
                      >
                        <InputSlot className="pl-4">
                          <InputIcon as={Users} />
                        </InputSlot>
                        <InputField
                          placeholder="Ospiti"
                          value={room.guests}
                          onChangeText={(value) =>
                            updateRoom(proposal.id, room.id, { guests: value })
                          }
                          inputMode="numeric"
                        />
                      </Input>

                      <Input
                        variant="outline"
                        size="md"
                        className="flex-1 rounded-2xl border-[var(--color-border)]"
                      >
                        <InputSlot className="pl-4">
                          <InputIcon as={Baby} />
                        </InputSlot>
                        <InputField
                          placeholder="Bambini"
                          value={room.children}
                          onChangeText={(value) =>
                            updateRoom(proposal.id, room.id, { children: value })
                          }
                          inputMode="numeric"
                        />
                      </Input>
                    </HStack>

                    <Textarea
                      className="mt-4 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
                      size="md"
                    >
                      <TextareaInput
                        placeholder="Note per il cliente (servizi inclusi, condizioni, upgrade...)"
                        value={room.notes}
                        onChangeText={(value) =>
                          updateRoom(proposal.id, room.id, { notes: value })
                        }
                        numberOfLines={3}
                      />
                    </Textarea>

                    <Button
                      variant="outline"
                      action="negative"
                      size="sm"
                      className="mt-4 self-start rounded-full border-[rgba(220,38,38,0.4)] bg-transparent px-4"
                      onPress={() => handleRemoveRoom(proposal.id, room.id)}
                      isDisabled={proposal.rooms.length === 1}
                    >
                      <Trash2 size={16} color="#dc2626" />
                      <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[#dc2626]">
                        Rimuovi stanza
                      </Text>
                    </Button>
                  </Box>
                ))}
              </VStack>

              <Button
                action="secondary"
                variant="outline"
                size="sm"
                className="mt-6 rounded-full border-[var(--color-border)] bg-[var(--color-background)] px-4"
                onPress={() => handleAddRoom(proposal.id)}
              >
                <Plus size={16} color="#6b7280" />
                <Text className="text-sm font-semibold text-[var(--color-neutral-700)]">
                  Aggiungi stanza
                </Text>
              </Button>
            </Box>
          ))}
        </VStack>
      </SectionCard>

      <SectionCard
        title="Riepilogo invio"
        subtitle="Controlla rapidamente le informazioni principali prima di procedere."
        contentClassName="space-y-4"
      >
        <HStack className="flex-col gap-4 lg:flex-row">
          <Box className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
            <HStack className="items-center gap-3">
              <FileText size={22} color="#aa6a24" />
              <Box>
                <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-600)]">
                  Proposte create
                </Text>
                <Text className="text-base font-semibold text-[var(--color-neutral-900)]">
                  {proposals.length} offerte ·{' '}
                  {proposals.reduce((total, item) => total + item.rooms.length, 0)}{' '}
                  stanze
                </Text>
              </Box>
            </HStack>
          </Box>
          <Box className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
            <HStack className="items-center gap-3">
              <Hotel size={22} color="#aa6a24" />
              <Box>
                <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-600)]">
                  Periodo richiesto
                </Text>
                <Text className="text-base font-semibold text-[var(--color-neutral-900)]">
                  {arrivalDate || '—'} → {departureDate || '—'}
                </Text>
                <Text className="text-xs text-[var(--color-neutral-500)]">
                  Offerta valida fino al {offerDate || '—'}
                </Text>
              </Box>
            </HStack>
          </Box>
        </HStack>
      </SectionCard>

      <Box className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button
          action="primary"
          size="lg"
          className="rounded-full bg-[#aa6a24] px-8 py-6 data-[hover=true]:bg-[#8f591e] data-[active=true]:bg-[#754515]"
          onPress={() => router.refresh()}
        >
          <Text className="text-base font-semibold text-white">
            Invia offerte al cliente
          </Text>
        </Button>
        <Button
          variant="outline"
          action="secondary"
          size="md"
          className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-6"
          onPress={() => {
            setCustomerForm(EMPTY_CUSTOMER);
            setCustomerQuery('');
            setSelectedCustomerId(null);
            setArrivalDate('');
            setDepartureDate('');
            setOfferDate('');
            setIntakeType('proposal');
            setProposals([createProposal()]);
          }}
        >
          <Text className="text-sm font-semibold text-[var(--color-neutral-700)]">
            Svuota modulo
          </Text>
        </Button>
      </Box>
    </Box>
  );
}
