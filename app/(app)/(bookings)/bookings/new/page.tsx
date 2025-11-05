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
import { Divider } from '@/components/ui/divider';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectTrigger,
  SelectInput,
  SelectItem,
  SelectPortal,
} from '@/components/ui/select';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  BadgeCheck,
  Baby,
  CalendarRange,
  CalendarCheck,
  Euro,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
  Users,
} from 'lucide-react-native';
import {
  BOOKING_NEXT_EVENTS,
  PAYMENT_METHODS,
  ROOM_TYPES,
} from '@/constants/catalogs';

type CustomerFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
};

type RatePlanId = 'flex' | 'b-safe' | 'non-refundable' | 'weekend';

type RoomEntry = {
  id: string;
  roomType: string;
  guests: number;
  children: number;
  ratePlan: RatePlanId | '';
  nightlyPrice: number;
  quantity: number;
  spaIncluded: boolean;
  spaPrice: number;
  notes: string;
  isEditing: boolean;
};

const EMPTY_CUSTOMER: CustomerFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  secondaryPhone: '',
};

const RATE_PLAN_OPTIONS: Array<{ id: RatePlanId; label: string; suggested: number }> = [
  { id: 'flex', label: 'Tariffa Flex', suggested: 160 },
  { id: 'b-safe', label: 'Tariffa B-Safe', suggested: 180 },
  { id: 'non-refundable', label: 'Tariffa Non rimborsabile', suggested: 190 },
  { id: 'weekend', label: 'Pacchetto Weekend', suggested: 210 },
];

const RATE_PLAN_BADGE_LABELS: Record<RatePlanId, string> = {
  flex: 'Flex',
  'b-safe': 'B-Safe',
  'non-refundable': 'Non Rimb.',
  weekend: 'Weekend',
};

const RATE_PLAN_SELECT = [
  { id: 'flex', label: 'Tariffa Flex' },
  { id: 'b-safe', label: 'Tariffa B-Safe' },
  { id: 'non-refundable', label: 'Tariffa Non rimborsabile' },
  { id: 'weekend', label: 'Pacchetto Weekend' },
] as const;

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return '—';
  }
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function formatDateForInput(date: Date) {
  return date.toISOString().split('T')[0] ?? '';
}

function calculateNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) {
    return 1;
  }
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
    return 1;
  }
  const diff = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

function createRoomEntry(): RoomEntry {
  return {
    id: crypto.randomUUID(),
    roomType: '',
    guests: 2,
    children: 0,
    ratePlan: '',
    nightlyPrice: 0,
    quantity: 1,
    spaIncluded: false,
    spaPrice: 35,
    notes: '',
    isEditing: true,
  };
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

function DateField({
  label,
  value,
  min,
  onChange,
  icon: Icon = CalendarRange,
}: {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
  icon?: typeof CalendarRange;
}) {
  return (
    <Box className="flex-1">
      <Text className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
        {label}
      </Text>
      <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 transition-colors focus-within:border-[#aa6a24] focus-within:web:ring-2 focus-within:web:ring-[rgba(170,106,36,0.35)]">
        <HStack className="items-center gap-3">
          <Icon size={18} color="#aa6a24" strokeWidth={2} />
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

function getSuggestedPrice(ratePlan: RatePlanId | '') {
  if (!ratePlan) {
    return 0;
  }
  return RATE_PLAN_OPTIONS.find((plan) => plan.id === ratePlan)?.suggested ?? 0;
}

function calculateRoomTotal(room: RoomEntry, nights: number) {
  const spaAddOn = room.spaIncluded ? room.spaPrice : 0;
  return (room.nightlyPrice + spaAddOn) * nights * room.quantity;
}

export default function BookingCreationPage() {
  const router = useRouter();
  const { data: customers = [] } = useGetCustomersQuery();

  const [customerForm, setCustomerForm] = useState<CustomerFormState>(EMPTY_CUSTOMER);
  const [customerQuery, setCustomerQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const todayIso = useMemo(() => formatDateForInput(new Date()), []);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [bookingDate, setBookingDate] = useState(todayIso);

  const [rooms, setRooms] = useState<RoomEntry[]>([createRoomEntry()]);
  const [nextEvent, setNextEvent] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);

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

  const updateRoom = (roomId: string, updater: (room: RoomEntry) => RoomEntry) => {
    setRooms((prev) => prev.map((room) => (room.id === roomId ? updater(room) : room)));
  };

  const handleRatePlanChange = (roomId: string, value: string) => {
    updateRoom(roomId, (current) => ({
      ...current,
      ratePlan: value as RatePlanId,
      nightlyPrice: getSuggestedPrice(value as RatePlanId),
    }));
  };

  const totalBooking = rooms.reduce(
    (sum, room) => sum + (room.isEditing ? 0 : calculateRoomTotal(room, nights)),
    0
  );

  const occupancy = useMemo(
    () =>
      rooms.reduce(
        (acc, room) => {
          const qty = Number.isFinite(room.quantity) ? room.quantity : 1;
          acc.adults += (room.guests || 0) * qty;
          acc.children += (room.children || 0) * qty;
          return acc;
        },
        { adults: 0, children: 0 }
    ),
    [rooms]
  );

  const hasSavedRooms = rooms.some(
    (room) => !room.isEditing && room.roomType && room.ratePlan
  );
  const submitLabel =
    paymentMethod === 'online' ? 'Invia link di pagamento' : 'Registra prenotazione';
  const canSubmit = Boolean(nextEvent && paymentMethod && hasSavedRooms);

  return (
    <Box className="pb-16">
      <Box className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Box>
          <Text className="text-3xl font-semibold text-[var(--color-neutral-900)]">Aggiungi prenotazione</Text>
          <Text className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-neutral-600)]">
            Inserisci una prenotazione già confermata o gestita offline per riallineare comunicazioni e pagamenti.
          </Text>
        </Box>
        <Button
          variant="outline"
          action="primary"
          size="md"
          className="rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-5"
          onPress={() => router.push('/bookings')}
        >
          <Text className="text-sm font-semibold text-[var(--color-primary-600)]">Torna alle liste</Text>
        </Button>
      </Box>

      <SectionCard
        title="Informazioni cliente"
        subtitle="Importa i dati o compila manualmente per collegare la prenotazione all'ospite corretto."
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
                    action={selectedCustomerId === customer.id ? 'primary' : 'secondary'}
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
                      {selectedCustomerId === customer.id ? <BadgeCheck size={18} color="#aa6a24" /> : null}
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
              <InputField placeholder="Nome" value={customerForm.firstName} onChangeText={(value) => setFormValue('firstName', value)} />
            </Input>
            <Input
              variant="outline"
              size="lg"
              className="flex-1 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <InputSlot className="pl-4">
                <InputIcon as={User} size="lg" className="text-[#6b7280]" />
              </InputSlot>
              <InputField placeholder="Cognome" value={customerForm.lastName} onChangeText={(value) => setFormValue('lastName', value)} />
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
              <InputField placeholder="Telefono principale" value={customerForm.phone} onChangeText={(value) => setFormValue('phone', value)} />
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
        title="Dettagli soggiorno"
        subtitle="Definisci il periodo confermato e, se necessario, la data in cui stai registrando la prenotazione."
        contentClassName="space-y-5"
      >
        <HStack className="flex-col gap-4 md:flex-row">
          <DateField label="Check-in" value={checkIn} onChange={setCheckIn} />
          <DateField label="Check-out" value={checkOut} min={checkIn || undefined} onChange={setCheckOut} />
          <DateField
            label="Data registrazione"
            value={bookingDate}
            onChange={setBookingDate}
            icon={CalendarCheck}
          />
        </HStack>
      </SectionCard>

      <SectionCard
        title="Accoglienza"
        subtitle="Configura le stanze confermate e registra i dettagli per l'automazione."
        contentClassName="space-y-6"
      >
        <Box className="rounded-3xl border border-[rgba(196,123,44,0.35)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
          <HStack className="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Box>
              <Text className="text-lg font-semibold text-[var(--color-primary-700)]">Prenotazione</Text>
              <Text className="text-xs uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                {rooms.length} stanza{rooms.length !== 1 ? 'e' : ''} · {nights} notte{nights !== 1 ? 'i' : ''}
              </Text>
              <Text className="text-xs text-[var(--color-neutral-500)]">
                Totale ospiti · {occupancy.adults} adulti
                {occupancy.children > 0 ? ` · ${occupancy.children} bambini` : ''}
              </Text>
            </Box>
            <Text className="text-sm font-semibold text-[var(--color-primary-700)]">
              Totale stimato · {formatCurrency(totalBooking)}
            </Text>
          </HStack>

          <Divider className="my-5 bg-[rgba(196,123,44,0.25)]" />

          <VStack space="md">
            {rooms.map((room, index) => {
              const roomTotal = calculateRoomTotal(room, nights);
              if (!room.isEditing) {
                return (
                  <Box key={room.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
                    <HStack className="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Box>
                        <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                          Stanza {index + 1} · {room.roomType || '—'}
                        </Text>
                        <Text className="text-xs text-[var(--color-neutral-600)]">
                          {room.guests} adulti · {room.children} bambini · {room.quantity} camera{room.quantity !== 1 ? 'e' : ''}
                          {room.spaIncluded ? ' · SPA' : ''}
                        </Text>
                      </Box>
                      <HStack className="items-center gap-3">
                        <Box className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1">
                          <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                            {room.ratePlan ? RATE_PLAN_BADGE_LABELS[room.ratePlan] : 'Tariffa'} · {formatCurrency(roomTotal)}
                          </Text>
                        </Box>
                        <Button
                          variant="outline"
                          action="secondary"
                          size="sm"
                          className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-4"
                          onPress={() =>
                            updateRoom(room.id, (current) => ({
                              ...current,
                              isEditing: true,
                            }))
                          }
                        >
                          <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-700)]">Modifica</Text>
                        </Button>
                        <Button
                          variant="outline"
                          action="negative"
                          size="sm"
                          className="rounded-full border-[rgba(220,38,38,0.3)] bg-transparent px-3"
                          onPress={() => setRooms((prev) => (prev.length === 1 ? prev : prev.filter((item) => item.id !== room.id)))}
                        >
                          <Trash2 size={16} color="#dc2626" />
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                );
              }

              return (
                <Box key={room.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-5">
                  <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">Configura stanza {index + 1}</Text>

                  <HStack className="mt-4 flex-col gap-4 lg:flex-row">
                    <Box className="flex-1">
                      <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        Tipologia stanza
                      </Text>
                      <Select
                        selectedValue={room.roomType || undefined}
                        onValueChange={(value) =>
                          updateRoom(room.id, (current) => ({
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
                            {ROOM_TYPES.map((type) => (
                              <SelectItem key={type} label={type} value={type} />
                            ))}
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                    </Box>

                    <Box className="flex-1">
                      <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        Tariffa
                      </Text>
                      <Select
                        selectedValue={room.ratePlan || undefined}
                        onValueChange={(value) => handleRatePlanChange(room.id, value)}
                        isDisabled={!room.roomType}
                      >
                        <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
                          <SelectInput placeholder="Seleziona la tariffa" />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent className="max-h-[320px] w-full">
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {RATE_PLAN_SELECT.map((option) => (
                              <SelectItem key={option.id} label={option.label} value={option.id} />
                            ))}
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                    </Box>

                    <Box className="flex-1">
                      <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        Adulto
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
                          onChangeText={(value) =>
                            updateRoom(room.id, (current) => ({
                              ...current,
                              guests: Math.max(1, Number.parseInt(value || '1', 10) || 1),
                            }))
                          }
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
                          onChangeText={(value) =>
                            updateRoom(room.id, (current) => ({
                              ...current,
                              children: Math.max(0, Number.parseInt(value || '0', 10) || 0),
                            }))
                          }
                        />
                      </Input>
                    </Box>
                  </HStack>

                  <Box className="mt-4">
                    <Text className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                      Tariffa selezionata
                    </Text>
                    {room.roomType && room.ratePlan ? (
                      <Box className="rounded-2xl border border-[rgba(196,123,44,0.35)] bg-[var(--color-surface)] px-4 py-4">
                        <HStack className="items-center justify-between gap-3">
                          <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                            {RATE_PLAN_SELECT.find((plan) => plan.id === room.ratePlan)?.label}
                          </Text>
                          <Box>
                            <Text className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-neutral-500)]">
                              Suggerito
                            </Text>
                            <Text className="text-sm font-medium text-[var(--color-neutral-700)]">
                              {formatCurrency(getSuggestedPrice(room.ratePlan))}
                            </Text>
                          </Box>
                        </HStack>
                        <HStack className="mt-3 items-center gap-2">
                          <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                            Prezzo/notte
                          </Text>
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
                              value={`${room.nightlyPrice}`}
                              onChangeText={(value) => {
                                const parsed = Number.parseInt(value, 10);
                                updateRoom(room.id, (current) => ({
                                  ...current,
                                  nightlyPrice: Number.isNaN(parsed) ? current.nightlyPrice : parsed,
                                }));
                              }}
                            />
                          </Input>
                        </HStack>
                      </Box>
                    ) : (
                      <Text className="text-sm text-[var(--color-neutral-500)]">
                        Seleziona stanza e tariffa per visualizzare i prezzi suggeriti.
                      </Text>
                    )}
                  </Box>

                  <HStack className="mt-4 flex-col gap-4 sm:flex-row">
                    <Box className="flex-1">
                      <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        Numero camere
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
                          value={`${room.quantity}`}
                          onChangeText={(value) =>
                            updateRoom(room.id, (current) => ({
                              ...current,
                              quantity: Math.max(1, Number.parseInt(value, 10) || 1),
                            }))
                          }
                        />
                      </Input>
                    </Box>
                    <Box className="flex-1">
                      <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        Accesso SPA
                      </Text>
                      <HStack className="items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                        <Switch
                          value={room.spaIncluded}
                          onValueChange={(value) =>
                            updateRoom(room.id, (current) => ({
                              ...current,
                              spaIncluded: value,
                            }))
                          }
                        />
                        <Input
                          variant="outline"
                          size="sm"
                          className="w-[120px] rounded-xl border-[rgba(196,123,44,0.35)] bg-[var(--color-surface)]"
                        >
                          <InputSlot className="pl-3">
                            <InputIcon as={Euro} size="sm" className="text-[#aa6a24]" />
                          </InputSlot>
                          <InputField
                            inputMode="numeric"
                            value={`${room.spaPrice}`}
                            onChangeText={(value) =>
                              updateRoom(room.id, (current) => ({
                                ...current,
                                spaPrice: Number.parseInt(value, 10) || current.spaPrice,
                              }))
                            }
                          />
                        </Input>
                      </HStack>
                    </Box>
                    <Box className="flex-1">
                      <Text className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        Note camera
                      </Text>
                      <Input
                        variant="outline"
                        size="sm"
                        className="rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
                      >
                        <InputField
                          placeholder="Es. upgrade vista mare"
                          value={room.notes}
                          onChangeText={(value) =>
                            updateRoom(room.id, (current) => ({
                              ...current,
                              notes: value,
                            }))
                          }
                        />
                      </Input>
                    </Box>
                  </HStack>

                  <HStack className="mt-5 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Text className="text-sm font-semibold text-[var(--color-primary-700)]">
                      Totale stanza · {formatCurrency(roomTotal)}
                    </Text>
                    <HStack className="items-center gap-3">
                      <Button
                        variant="outline"
                        action="default"
                        size="sm"
                        className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-4"
                        onPress={() =>
                          updateRoom(room.id, (current) => ({
                            ...current,
                            isEditing: false,
                          }))
                        }
                      >
                        <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-700)]">Salva stanza</Text>
                      </Button>
                      <Button
                        variant="outline"
                        action="negative"
                        size="sm"
                        className="rounded-full border-[rgba(220,38,38,0.3)] bg-transparent px-3"
                        onPress={() => setRooms((prev) => (prev.length === 1 ? prev : prev.filter((item) => item.id !== room.id)))}
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
            variant="outline"
            action="secondary"
            size="sm"
            className="mt-5 rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-4"
            onPress={() => setRooms((prev) => [...prev, createRoomEntry()])}
          >
            <Plus size={16} color="#6b7280" />
            <Text className="text-sm font-semibold text-[var(--color-neutral-700)]">Aggiungi stanza</Text>
          </Button>

        </Box>
      </SectionCard>

      <SectionCard
        title="Automazione comunicazioni"
        subtitle="Allinea il flusso con il prossimo evento e il metodo di incasso registrato."
        contentClassName="space-y-4"
      >
        <HStack className="flex-col gap-4 md:flex-row">
          <Select selectedValue={nextEvent} onValueChange={setNextEvent} className="w-full md:flex-1">
            <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
              <SelectInput placeholder="Prossimo evento" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent className="max-h-[320px] w-full">
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {BOOKING_NEXT_EVENTS.map((event) => (
                  <SelectItem key={event.value} label={event.label} value={event.value} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Select selectedValue={paymentMethod || undefined} onValueChange={setPaymentMethod} className="w-full md:flex-1">
            <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
              <SelectInput placeholder="Metodo di pagamento" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent className="max-h-[320px] w-full">
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method.value} label={method.label} value={method.value} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>
        <Textarea className="rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]" size="md">
          <TextareaInput
            placeholder="Note interne (documenti ricevuti, caparra, richieste speciali...)"
            value={internalNotes}
            onChangeText={setInternalNotes}
            numberOfLines={4}
          />
        </Textarea>

        <Button
          action="primary"
          size="lg"
          className="mt-2 rounded-full bg-[#aa6a24] px-8 py-5 data-[hover=true]:bg-[#8f591e] data-[active=true]:bg-[#754515]"
          isDisabled={!canSubmit}
          onPress={() => {
            if (!canSubmit) {
              return;
            }
            router.refresh();
          }}
        >
          <Text className="text-base font-semibold text-white">{submitLabel}</Text>
        </Button>
      </SectionCard>
    </Box>
  );
}
