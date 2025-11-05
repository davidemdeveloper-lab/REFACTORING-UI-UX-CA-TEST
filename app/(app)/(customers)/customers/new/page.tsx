'use client';

import { useEffect, useMemo, useState } from 'react';
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
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { Divider } from '@/components/ui/divider';
import { Badge } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import {
  Search,
  User,
  Phone,
  Mail,
  CalendarRange,
  CalendarCheck,
  BadgeCheck,
  Plus,
  Trash2,
  Pencil,
  Euro,
  Users,
  Baby,
  Info,
  Sparkles,
  BedDouble,
} from 'lucide-react-native';

type IntakeType = 'proposal' | 'online' | 'manual';

type CustomerFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
};

type RatePlanId = 'flex' | 'b-safe' | 'non-refundable' | 'weekend';

type RateOption = {
  id: RatePlanId;
  label: string;
  price: number;
  suggestedPrice: number;
};

type ProposalRoom = {
  id: string;
  roomType: string;
  guests: number;
  children: number;
  spaIncluded: boolean;
  spaPrice: number;
  notes: string;
  rateOptions: RateOption[];
  selectedRatePlan: 'all' | RatePlanId;
  isEditing: boolean;
};

type Proposal = {
  id: string;
  rooms: ProposalRoom[];
};

type RoomTotal = {
  id: RatePlanId;
  nightly: number;
  total: number;
};

const EMPTY_CUSTOMER: CustomerFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  secondaryPhone: '',
};

const ROOM_OPTIONS = ['Junior Suite', 'Suite Executive', 'Suite Home'];

const RATE_PLAN_OPTIONS: Array<{ id: RatePlanId; label: string }> = [
  { id: 'flex', label: 'Tariffa Flex' },
  { id: 'b-safe', label: 'Tariffa B-Safe' },
  { id: 'non-refundable', label: 'Tariffa Non rimborsabile' },
  { id: 'weekend', label: 'Pacchetto Weekend' },
];

const RATE_PLAN_BADGE_LABELS: Record<RatePlanId, string> = {
  flex: 'Flex',
  'b-safe': 'B-Safe',
  'non-refundable': 'Non Rimb.',
  weekend: 'Weekend',
};

const RATE_PLAN_SELECT_OPTIONS = [
  { id: 'all', label: 'Tutte le tariffe' },
  ...RATE_PLAN_OPTIONS.map((option) => ({ id: option.id, label: option.label })),
] as const;

function formatDateForInput(date: Date) {
  return date.toISOString().split('T')[0] ?? '';
}

function calculateNights(arrival: string, departure: string) {
  if (!arrival || !departure) {
    return 1;
  }
  const inDate = new Date(arrival);
  const outDate = new Date(departure);
  if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
    return 1;
  }
  const diff = Math.ceil(
    (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 1;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(value);
}

function toCustomerForm(customer: Customer): CustomerFormState {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email ?? '',
    phone: customer.phone ?? '',
    secondaryPhone: customer.secondaryPhone ?? '',
  };
}

function generateRateOptions(
  previous: RateOption[] | undefined,
  guests: number,
  children: number
): RateOption[] {
  return RATE_PLAN_OPTIONS.map((plan, index) => {
    const base = 96 + guests * 24 + children * 12 + index * 18;
    const suggested = Math.max(60, Math.round(base));
    const existing = previous?.find((option) => option.id === plan.id);
    return {
      id: plan.id,
      label: plan.label,
      suggestedPrice: suggested,
      price: existing ? existing.price : suggested,
    };
  });
}

function createProposalRoom(): ProposalRoom {
  return {
    id: crypto.randomUUID(),
    roomType: '',
    guests: 2,
    children: 0,
    spaIncluded: false,
    spaPrice: 35,
    notes: '',
    rateOptions: generateRateOptions(undefined, 2, 0),
    selectedRatePlan: 'all',
    isEditing: true,
  };
}

function createInitialProposal(): Proposal {
  return {
    id: crypto.randomUUID(),
    rooms: [createProposalRoom()],
  };
}

function getAdultCount(value: string) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return 1;
  }
  return Math.max(1, Math.min(parsed, 6));
}

function getChildCount(value: string) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return Math.max(0, Math.min(parsed, 6));
}

function getVisibleRateOptions(room: ProposalRoom) {
  if (room.selectedRatePlan === 'all') {
    return room.rateOptions;
  }
  return room.rateOptions.filter((option) => option.id === room.selectedRatePlan);
}

function getRoomTariffTotals(room: ProposalRoom, nights: number): RoomTotal[] {
  const options = getVisibleRateOptions(room);
  const spaAddOn = room.spaIncluded ? room.spaPrice * nights : 0;

  return options.map((option) => ({
    id: option.id,
    nightly: option.price,
    total: option.price * nights + spaAddOn,
  }));
}

function getProposalTariffTotals(
  proposal: Proposal,
  nights: number
): RoomTotal[] {
  const totals = new Map<RatePlanId, RoomTotal>();

  proposal.rooms.forEach((room) => {
    getRoomTariffTotals(room, nights).forEach((roomTotal) => {
      const existing = totals.get(roomTotal.id);
      totals.set(roomTotal.id, {
        ...roomTotal,
        total: (existing?.total ?? 0) + roomTotal.total,
      });
    });
  });

  return Array.from(totals.values());
}

function getRatePlanBadgeLabel(ratePlanId: RatePlanId) {
  return RATE_PLAN_BADGE_LABELS[ratePlanId] ?? ratePlanId;
}

type DateFieldProps = {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
};

function DateField({ label, value, min, onChange }: DateFieldProps) {
  return (
    <Box className="flex-1">
      <Text className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
        {label}
      </Text>
      <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 transition-colors focus-within:border-[#aa6a24] focus-within:web:ring-2 focus-within:web:ring-[rgba(170,106,36,0.35)]">
        <HStack className="items-center gap-3">
          <CalendarRange size={18} color="#aa6a24" strokeWidth={2} />
          <input
            type="date"
            min={min}
            className="w-full border-none bg-transparent text-sm text-[var(--color-neutral-900)] outline-none focus:ring-0"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </HStack>
      </Box>
    </Box>
  );
}

type IntakeOptionProps = {
  label: string;
  value: IntakeType;
  isActive: boolean;
  onSelect: (value: IntakeType) => void;
};

function IntakeOption({ label, value, isActive, onSelect }: IntakeOptionProps) {
  return (
    <Pressable
      role="radio"
      aria-checked={isActive}
      className={`flex-1 rounded-2xl border px-4 py-3 transition-colors ${
        isActive
          ? 'border-[#aa6a24] bg-[rgba(196,123,44,0.12)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)]'
      }`}
      onPress={() => onSelect(value)}
    >
      <Text
        className={`text-sm font-medium ${
          isActive
            ? 'text-[var(--color-neutral-900)]'
            : 'text-[var(--color-neutral-700)]'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
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

  const todayIso = useMemo(() => formatDateForInput(new Date()), []);
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [bookingDate, setBookingDate] = useState(todayIso);

  const [intakeType, setIntakeType] = useState<IntakeType>('proposal');
  const [proposals, setProposals] = useState<Proposal[]>([
    createInitialProposal(),
  ]);

  const nights = useMemo(
    () => calculateNights(arrivalDate, departureDate),
    [arrivalDate, departureDate]
  );

  useEffect(() => {
    if (intakeType === 'proposal') {
      if (proposals.length === 0) {
        setProposals([createInitialProposal()]);
      }
      return;
    }

    setProposals((prev) => {
      if (prev.length === 0) {
        return [createInitialProposal()];
      }
      if (prev.length === 1) {
        return prev;
      }
      return [prev[0]];
    });
  }, [intakeType, proposals.length]);

  useEffect(() => {
    if (arrivalDate && departureDate && arrivalDate > departureDate) {
      setDepartureDate(arrivalDate);
    }
  }, [arrivalDate, departureDate]);

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

  const updateRoom = (
    proposalId: string,
    roomId: string,
    updater: (room: ProposalRoom) => ProposalRoom
  ) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              rooms: proposal.rooms.map((room) =>
                room.id === roomId ? updater(room) : room
              ),
            }
          : proposal
      )
    );
  };

  const handleRatePlanChange = (
    proposalId: string,
    roomId: string,
    value: string
  ) => {
    updateRoom(proposalId, roomId, (current) => ({
      ...current,
      selectedRatePlan: (value as ProposalRoom['selectedRatePlan']) ?? 'all',
    }));
  };

  const handleAddProposal = () => {
    setProposals((prev) => [...prev, createInitialProposal()]);
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
          ? { ...proposal, rooms: [...proposal.rooms, createProposalRoom()] }
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

  return (
    <Box className="pb-16">
      <Box className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Box>
          <Text className="text-3xl font-semibold text-[var(--color-neutral-900)]">
            Accogli cliente
          </Text>
          <Text className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-neutral-600)]">
            Importa un ospite, scegli l&apos;accoglienza e costruisci proposte con stanze,
            tariffe e servizi per inviare subito l&apos;offerta completa.
          </Text>
        </Box>
        <Button
          variant="outline"
          action="primary"
          size="md"
          className="rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-5"
          onPress={() => router.push('/customers')}
        >
          <Text className="text-sm font-semibold text-[var(--color-primary-600)]">
            Torna alle liste
          </Text>
        </Button>
      </Box>

      <SectionCard
        title="Informazioni cliente"
        subtitle="Compila i dati o richiamali da un cliente già presente nel database."
        contentClassName="space-y-6"
      >
        <Box>
          <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-neutral-500)]">
            Cerca tra i clienti registrati
          </Text>
          <Box className="mt-3">
            <Input
              variant="outline"
              size="lg"
              className="rounded-2xl border border-[rgba(196,123,44,0.45)] bg-[var(--color-surface)] data-[hover=true]:border-[rgba(196,123,44,0.65)] data-[focus=true]:border-[#aa6a24] data-[focus=true]:web:ring-2 data-[focus=true]:web:ring-[rgba(170,106,36,0.35)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={Search} size="lg" className="text-[#aa6a24]" />
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
            <Box className="mt-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
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
                        ? 'border-[var(--color-primary-500)] bg-[rgba(196,123,44,0.12)]'
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
              className="flex-1 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={User} size="lg" className="text-[#6b7280]" />
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
              className="flex-1 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={User} size="lg" className="text-[#6b7280]" />
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
              className="flex-1 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={Phone} size="lg" className="text-[#6b7280]" />
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
              className="flex-1 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={Phone} size="lg" className="text-[#6b7280]" />
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
            className="rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <InputSlot className="pl-4">
              <InputIcon as={Mail} size="lg" className="text-[#6b7280]" />
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
        subtitle="Definisci il periodo richiesto e la data in cui stai registrando l'accoglienza."
        contentClassName="space-y-5"
      >
        <HStack className="flex-col gap-4 md:flex-row">
          <DateField
            label="Data arrivo"
            value={arrivalDate}
            min={bookingDate}
            onChange={setArrivalDate}
          />
          <DateField
            label="Data partenza"
            value={departureDate}
            min={arrivalDate || bookingDate}
            onChange={setDepartureDate}
          />
          <Box className="flex-1">
            <Text className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
              Data prenotazione
            </Text>
            <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 transition-colors focus-within:border-[#aa6a24] focus-within:web:ring-2 focus-within:web:ring-[rgba(170,106,36,0.35)]">
              <HStack className="items-center gap-3">
                <CalendarCheck size={18} color="#aa6a24" strokeWidth={2} />
                <input
                  type="date"
                  className="w-full border-none bg-transparent text-sm text-[var(--color-neutral-900)] outline-none focus:ring-0"
                  value={bookingDate}
                  min={todayIso}
                  onChange={(event) => setBookingDate(event.target.value)}
                />
              </HStack>
            </Box>
          </Box>
        </HStack>

        <Alert
          action="info"
          variant="outline"
          className="items-start rounded-xl border-[rgba(196,123,44,0.35)] bg-[rgba(196,123,44,0.12)] px-4 py-3"
        >
          <AlertIcon as={Info} size="sm" />
          <AlertText className="text-xs leading-5 text-[var(--color-primary-700)]">
            Le date non sono modificabili durante la creazione di un pacchetto.
          </AlertText>
        </Alert>
      </SectionCard>

      <SectionCard
        title="Accoglienza"
        subtitle="Scegli il flusso di accoglienza e componi le offerte con stanze, tariffe e servizi."
        contentClassName="space-y-8"
      >
        <Box>
          <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
            Tipo accoglienza
          </Text>
          <Text className="text-sm text-[var(--color-neutral-600)]">
            Seleziona il flusso con cui inviare le informazioni al cliente.
          </Text>
        </Box>

        <HStack
          role="radiogroup"
          className="flex-col gap-3 md:flex-row"
        >
          <IntakeOption
            label="Invio proposta"
            value="proposal"
            isActive={intakeType === 'proposal'}
            onSelect={setIntakeType}
          />
          <IntakeOption
            label="Pagamento online"
            value="online"
            isActive={intakeType === 'online'}
            onSelect={setIntakeType}
          />
          <IntakeOption
            label="Pagamento in struttura"
            value="manual"
            isActive={intakeType === 'manual'}
            onSelect={setIntakeType}
          />
        </HStack>

        <Divider className="bg-[var(--color-border)]" />

        {intakeType === 'proposal' ? (
          <Button
            action="primary"
            variant="outline"
            size="sm"
            className="self-start rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-4"
            onPress={handleAddProposal}
          >
            <Plus size={16} color="#aa6a24" />
            <Text className="text-sm font-semibold text-[var(--color-primary-600)]">
              Aggiungi offerta
            </Text>
          </Button>
        ) : null}

        <VStack space="lg">
          {proposals.map((proposal, proposalIndex) => {
            const proposalTotals = getProposalTariffTotals(proposal, nights);
            return (
              <Box
                key={proposal.id}
                className="rounded-3xl border border-[rgba(196,123,44,0.35)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]"
              >
                <HStack className="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Box>
                    <Text className="text-lg font-semibold text-[var(--color-primary-700)]">
                      {intakeType === 'proposal'
                        ? `Proposta ${proposalIndex + 1}`
                        : 'Offerta da inviare'}
                    </Text>
                    <Text className="text-xs uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                      {nights} notte{nights !== 1 ? 'i' : ''} ·{' '}
                      {proposal.rooms.length} stanza{proposal.rooms.length !== 1 ? 'e' : ''}
                    </Text>
                  </Box>
                  <HStack className="flex-wrap items-center gap-2">
                    {proposalTotals.length > 0 ? (
                      proposalTotals.map((total) => (
                        <Badge
                          key={`${proposal.id}-${total.id}`}
                          size="sm"
                          action="muted"
                          className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
                        >
                          <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                            {getRatePlanBadgeLabel(total.id)} · {formatCurrency(total.total)}
                          </Text>
                        </Badge>
                      ))
                    ) : (
                      <Text className="text-sm text-[var(--color-neutral-500)]">
                        Aggiungi almeno una stanza per calcolare il totale.
                      </Text>
                    )}
                    {intakeType === 'proposal' && proposals.length > 1 ? (
                      <Button
                        variant="outline"
                        action="negative"
                        size="sm"
                        className="rounded-full border-[rgba(220,38,38,0.3)] bg-transparent px-4"
                        onPress={() => handleRemoveProposal(proposal.id)}
                      >
                        <Trash2 size={16} color="#dc2626" />
                        <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[#dc2626]">
                          Elimina offerta
                        </Text>
                      </Button>
                    ) : null}
                  </HStack>
                </HStack>

                <Divider className="my-5 bg-[rgba(196,123,44,0.25)]" />

                <VStack space="md">
                  {proposal.rooms.map((room, roomIndex) => {
                    const roomTotals = getRoomTariffTotals(room, nights);
                    if (!room.isEditing) {
                      return (
                        <Box
                          key={room.id}
                          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4"
                        >
                          <HStack className="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <Box>
                              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                                Stanza {roomIndex + 1}{' '}
                                {room.roomType ? `· ${room.roomType}` : ''}
                              </Text>
                              <Text className="text-xs text-[var(--color-neutral-600)]">
                                {room.guests} adulti · {room.children} bambini
                                {room.spaIncluded ? ' · SPA inclusa' : ''}
                              </Text>
                            </Box>
                            <HStack className="items-center gap-3">
                              <HStack className="flex-wrap items-center gap-2">
                                {roomTotals.map((total) => (
                                  <Badge
                                    key={`${room.id}-${total.id}`}
                                    size="sm"
                                    action="muted"
                                    className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
                                  >
                                    <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                                      {getRatePlanBadgeLabel(total.id)} · {formatCurrency(total.total)}
                                    </Text>
                                  </Badge>
                                ))}
                              </HStack>
                              <Button
                                variant="outline"
                                action="secondary"
                                size="sm"
                                className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-4"
                                onPress={() =>
                                  updateRoom(proposal.id, room.id, (current) => ({
                                    ...current,
                                    isEditing: true,
                                  }))
                                }
                              >
                                <Pencil size={16} color="#6b7280" />
                                <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-700)]">
                                  Modifica
                                </Text>
                              </Button>
                              <Button
                                variant="outline"
                                action="negative"
                                size="sm"
                                className="rounded-full border-[rgba(220,38,38,0.3)] bg-transparent px-3"
                                onPress={() => handleRemoveRoom(proposal.id, room.id)}
                                isDisabled={proposal.rooms.length === 1}
                              >
                                <Trash2 size={16} color="#dc2626" />
                              </Button>
                            </HStack>
                          </HStack>
                        </Box>
                      );
                    }

                    return (
                      <Box
                        key={room.id}
                        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-5"
                      >
                        <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                          Configura stanza {roomIndex + 1}
                        </Text>

                        <HStack className="mt-4 flex-col gap-4 lg:flex-row">
                          <Box className="flex-1">
                            <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                              Tipologia stanza
                            </Text>
                            <Select
                              selectedValue={room.roomType || undefined}
                              onValueChange={(value) =>
                                updateRoom(proposal.id, room.id, (current) => ({
                                  ...current,
                                  roomType: value,
                                }))
                              }
                            >
                              <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
                                <SelectInput placeholder="Seleziona la stanza" />
                              </SelectTrigger>
                              <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent className="max-h-[320px] w-full">
                                  <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                  </SelectDragIndicatorWrapper>
                                  {ROOM_OPTIONS.map((type) => (
                                    <SelectItem key={type} label={type} value={type} />
                                  ))}
                                </SelectContent>
                              </SelectPortal>
                            </Select>
                          </Box>

                          <Box className="flex-1">
                            <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                              Tariffe
                            </Text>
                            <Select
                              selectedValue={room.selectedRatePlan}
                              onValueChange={(value) =>
                                handleRatePlanChange(proposal.id, room.id, value)
                              }
                              isDisabled={!room.roomType}
                            >
                              <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
                                <SelectInput placeholder="Seleziona tariffe" />
                              </SelectTrigger>
                              <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent className="max-h-[320px] w-full">
                                  <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                  </SelectDragIndicatorWrapper>
                                  {RATE_PLAN_SELECT_OPTIONS.map((option) => (
                                    <SelectItem
                                      key={option.id}
                                      label={option.label}
                                      value={option.id}
                                    />
                                  ))}
                                </SelectContent>
                              </SelectPortal>
                            </Select>
                          </Box>

                          <Box className="flex-1">
                            <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                              Adulti
                            </Text>
                            <Input
                              variant="outline"
                              size="md"
                              className="rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
                            >
                              <InputSlot className="pl-4">
                                <InputIcon as={Users} size="md" className="text-[#6b7280]" />
                              </InputSlot>
                              <InputField
                                inputMode="numeric"
                                value={`${room.guests}`}
                                onChangeText={(value) => {
                                  const guests = getAdultCount(value);
                                  updateRoom(proposal.id, room.id, (current) => ({
                                    ...current,
                                    guests,
                                    rateOptions: generateRateOptions(
                                      current.rateOptions,
                                      guests,
                                      current.children
                                    ),
                                  }));
                                }}
                              />
                            </Input>
                          </Box>

                          <Box className="flex-1">
                            <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                              Bambini
                            </Text>
                            <Input
                              variant="outline"
                              size="md"
                              className="rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
                            >
                              <InputSlot className="pl-4">
                                <InputIcon as={Baby} size="md" className="text-[#6b7280]" />
                              </InputSlot>
                              <InputField
                                inputMode="numeric"
                                value={`${room.children}`}
                                onChangeText={(value) => {
                                  const children = getChildCount(value);
                                  updateRoom(proposal.id, room.id, (current) => ({
                                    ...current,
                                    children,
                                    rateOptions: generateRateOptions(
                                      current.rateOptions,
                                      current.guests,
                                      children
                                    ),
                                  }));
                                }}
                              />
                            </Input>
                          </Box>
                        </HStack>

                        <Box className="mt-4">
                          <Text className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                            Tariffe
                          </Text>
                          <Box className="grid gap-3 md:grid-cols-2">
                            {getVisibleRateOptions(room).map((option) => (
                              <Box
                                key={option.id}
                                className="rounded-2xl border border-[rgba(196,123,44,0.35)] bg-[var(--color-surface)] px-4 py-4"
                              >
                                <HStack className="items-center gap-2">
                                  <BedDouble size={18} color="#aa6a24" strokeWidth={2} />
                                  <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                                    {option.label}
                                  </Text>
                                </HStack>
                                <HStack className="mt-3 items-center justify-between gap-3">
                                  <Box>
                                    <Text className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-neutral-500)]">
                                      Suggerito
                                    </Text>
                                    <Text className="text-sm font-medium text-[var(--color-neutral-700)]">
                                      {formatCurrency(option.suggestedPrice)}
                                    </Text>
                                  </Box>
                                  <Input
                                    variant="outline"
                                    size="sm"
                                    className="w-[140px] rounded-xl border-[rgba(196,123,44,0.35)] bg-[var(--color-surface)]"
                                  >
                                    <InputSlot className="pl-3">
                                      <InputIcon as={Euro} size="sm" className="text-[#aa6a24]" />
                                    </InputSlot>
                                    <InputField
                                      inputMode="numeric"
                                      value={`${option.price}`}
                                      onChangeText={(value) => {
                                        const parsed = Number.parseInt(value, 10);
                                        updateRoom(proposal.id, room.id, (current) => ({
                                          ...current,
                                          rateOptions: current.rateOptions.map((item) =>
                                            item.id === option.id
                                              ? {
                                                  ...item,
                                                  price: Number.isNaN(parsed)
                                                    ? option.price
                                                    : parsed,
                                                }
                                              : item
                                          ),
                                        }));
                                      }}
                                    />
                                  </Input>
                                </HStack>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        <HStack className="mt-5 flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <HStack className="items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                            <Switch
                              value={room.spaIncluded}
                              onValueChange={(value) =>
                                updateRoom(proposal.id, room.id, (current) => ({
                                  ...current,
                                  spaIncluded: value,
                                }))
                              }
                            />
                            <Box>
                              <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                                Accesso SPA
                              </Text>
                              <Input
                                variant="outline"
                                size="sm"
                                className="mt-1 w-[140px] rounded-xl border-[rgba(196,123,44,0.35)] bg-[var(--color-surface)]"
                              >
                                <InputSlot className="pl-3">
                                  <InputIcon as={Sparkles} size="sm" className="text-[#aa6a24]" />
                                </InputSlot>
                                <InputField
                                  inputMode="numeric"
                                  value={`${room.spaPrice}`}
                                  onChangeText={(value) => {
                                    const parsed = Number.parseInt(value, 10);
                                    updateRoom(proposal.id, room.id, (current) => ({
                                      ...current,
                                      spaPrice: Number.isNaN(parsed) ? current.spaPrice : parsed,
                                    }));
                                  }}
                                />
                              </Input>
                            </Box>
                          </HStack>
                          <Input
                            variant="outline"
                            size="sm"
                            className="w-full rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] md:w-[320px]"
                          >
                            <InputField
                              placeholder="Note per il cliente (opzionali)"
                              value={room.notes}
                              onChangeText={(value) =>
                                updateRoom(proposal.id, room.id, (current) => ({
                                  ...current,
                                  notes: value,
                                }))
                              }
                            />
                          </Input>
                        </HStack>

                        <HStack className="mt-5 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <HStack className="flex-wrap items-center gap-2">
                            {roomTotals.map((total) => (
                              <Badge
                                key={`${room.id}-${total.id}-editing`}
                                size="sm"
                                action="muted"
                                className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
                              >
                                <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                                  {getRatePlanBadgeLabel(total.id)} · {formatCurrency(total.total)}
                                </Text>
                              </Badge>
                            ))}
                          </HStack>
                          <HStack className="items-center gap-3">
                            <Button
                              variant="outline"
                              action="default"
                              size="sm"
                              className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-4"
                              onPress={() =>
                                updateRoom(proposal.id, room.id, (current) => ({
                                  ...current,
                                  isEditing: false,
                                }))
                              }
                            >
                              <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-700)]">
                                Salva stanza
                              </Text>
                            </Button>
                            <Button
                              variant="outline"
                              action="negative"
                              size="sm"
                              className="rounded-full border-[rgba(220,38,38,0.3)] bg-transparent px-3"
                              onPress={() => handleRemoveRoom(proposal.id, room.id)}
                              isDisabled={proposal.rooms.length === 1}
                            >
                              <Trash2 size={16} color="#dc2626" />
                            </Button>
                          </HStack>
                        </HStack>
                      </Box>
                    );
                  })}
                </VStack>

                <Button
                  action="secondary"
                  variant="outline"
                  size="sm"
                  className="mt-5 rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-4"
                  onPress={() => handleAddRoom(proposal.id)}
                >
                  <Plus size={16} color="#6b7280" />
                  <Text className="text-sm font-semibold text-[var(--color-neutral-700)]">
                    Aggiungi stanza
                  </Text>
                </Button>

                <HStack className="mt-6 justify-end">
                  <Button
                    action="primary"
                    size="md"
                    className="rounded-full bg-[#aa6a24] px-6 py-4 data-[hover=true]:bg-[#8f591e] data-[active=true]:bg-[#754515]"
                    onPress={() => router.refresh()}
                  >
                    <Text className="text-sm font-semibold text-white">
                      {intakeType === 'proposal'
                        ? 'Invia offerte al cliente'
                        : 'Invia offerta al cliente'}
                    </Text>
                  </Button>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </SectionCard>
    </Box>
  );
}
