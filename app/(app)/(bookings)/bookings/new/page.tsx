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
import { Switch } from '@/components/ui/switch';
import {
  Baby,
  CalendarRange,
  Euro,
  Hash,
  Hotel,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
  Users,
  ChevronDown,
  ClipboardCheck,
} from 'lucide-react-native';
import {
  BOOKING_NEXT_EVENTS,
  PAYMENT_METHODS,
  RATE_PLANS,
  ROOM_TYPES,
} from '@/constants/catalogs';

type CustomerFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
};

type RoomEntry = {
  id: string;
  roomType: string;
  ratePlan: string;
  quantity: string;
  pricePerNight: string;
  spaIncluded: boolean;
  notes: string;
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

function createRoomEntry(): RoomEntry {
  return {
    id: crypto.randomUUID(),
    roomType: '',
    ratePlan: 'Tutte le tariffe',
    quantity: '1',
    pricePerNight: '',
    spaIncluded: false,
    notes: '',
  };
}

export default function BookingCreationPage() {
  const router = useRouter();
  const { data: customers = [] } = useGetCustomersQuery();

  const [customerForm, setCustomerForm] =
    useState<CustomerFormState>(EMPTY_CUSTOMER);
  const [customerQuery, setCustomerQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [childrenCount, setChildrenCount] = useState('0');

  const [rooms, setRooms] = useState<RoomEntry[]>([createRoomEntry()]);
  const [nextEvent, setNextEvent] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('manual');
  const [internalNotes, setInternalNotes] = useState('');

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
    setCustomerQuery(`${customer.firstName} ${customer.lastName}`);
    setSelectedCustomerId(customer.id);
  };

  const addRoomEntry = () => {
    setRooms((prev) => [...prev, createRoomEntry()]);
  };

  const removeRoomEntry = (roomId: string) => {
    setRooms((prev) => (prev.length === 1 ? prev : prev.filter((room) => room.id !== roomId)));
  };

  const updateRoom = (roomId: string, partial: Partial<RoomEntry>) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomId ? { ...room, ...partial } : room))
    );
  };

  return (
    <Box className="pb-16">
      <Box className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Box>
          <Text className="text-3xl font-semibold text-[var(--color-neutral-900)]">
            Aggiungi prenotazione
          </Text>
          <Text className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-neutral-600)]">
            Inserisci una prenotazione già confermata o gestita offline e
            riallinea il flusso di comunicazioni dal prossimo evento utile.
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
        subtitle="Importa i dati dal database o compilali manualmente per abbinarli alla prenotazione."
        contentClassName="space-y-6"
      >
        <Box>
          <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-neutral-500)]">
            Lista clienti
          </Text>
          <Box className="mt-3">
            <Input variant="outline" size="lg" className="rounded-2xl border-[var(--color-border)]">
              <InputSlot className="pl-4">
                <InputIcon as={Search} size="lg" />
              </InputSlot>
              <InputField
                placeholder="Cerca per nome, email o telefono..."
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
                Clienti suggeriti
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
        subtitle="Definisci il soggiorno e gli ospiti collegati alla prenotazione."
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
              placeholder="Check-in"
              value={checkIn}
              onChangeText={setCheckIn}
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
              placeholder="Check-out"
              value={checkOut}
              onChangeText={setCheckOut}
            />
          </Input>
          <Input
            variant="outline"
            size="lg"
            className="flex-1 rounded-2xl border-[var(--color-border)]"
          >
            <InputSlot className="pl-4">
              <InputIcon as={Users} size="lg" />
            </InputSlot>
            <InputField
              placeholder="Numero ospiti"
              value={guestCount}
              onChangeText={setGuestCount}
              inputMode="numeric"
            />
          </Input>
        </HStack>
        <Input
          variant="outline"
          size="lg"
          className="w-full rounded-2xl border-[var(--color-border)]"
        >
          <InputSlot className="pl-4">
            <InputIcon as={Baby} size="lg" />
          </InputSlot>
          <InputField
            placeholder="Bambini (facoltativo)"
            value={childrenCount}
            onChangeText={setChildrenCount}
            inputMode="numeric"
          />
        </Input>
      </SectionCard>

      <SectionCard
        title="Dettagli stanze"
        subtitle="Aggiungi le combinazioni di stanze e tariffe presenti nella prenotazione."
        contentClassName="space-y-6"
      >
        <Button
          action="primary"
          variant="outline"
          size="sm"
          className="self-start rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-background)] px-4"
          onPress={addRoomEntry}
        >
          <Plus size={16} color="#aa6a24" />
          <Text className="text-sm font-semibold text-[var(--color-primary-600)]">
            Aggiungi tipologia stanza
          </Text>
        </Button>

        <VStack space="lg">
          {rooms.map((room) => (
            <Box
              key={room.id}
              className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-5"
            >
              <HStack className="flex-col gap-4 lg:flex-row">
                <Select
                  selectedValue={room.roomType}
                  onValueChange={(value) =>
                    updateRoom(room.id, { roomType: value })
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
                        <SelectItem key={type} label={type} value={type} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>

                <Select
                  selectedValue={room.ratePlan}
                  onValueChange={(value) =>
                    updateRoom(room.id, { ratePlan: value })
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
                    <InputIcon as={Hash} />
                  </InputSlot>
                  <InputField
                    placeholder="Numero stanze"
                    value={room.quantity}
                    onChangeText={(value) =>
                      updateRoom(room.id, { quantity: value })
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
                    <InputIcon as={Euro} />
                  </InputSlot>
                  <InputField
                    placeholder="Prezzo per notte"
                    value={room.pricePerNight}
                    onChangeText={(value) =>
                      updateRoom(room.id, { pricePerNight: value })
                    }
                    inputMode="decimal"
                  />
                </Input>
              </HStack>

              <Box className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                <HStack className="items-center justify-between gap-3">
                  <Box>
                    <Text className="text-sm font-semibold text-[var(--color-neutral-800)]">
                      Accesso SPA incluso
                    </Text>
                    <Text className="text-xs text-[var(--color-neutral-500)]">
                      Indica se la tariffa comprende l&apos;ingresso al centro benessere.
                    </Text>
                  </Box>
                  <Switch
                    size="md"
                    value={room.spaIncluded}
                    onValueChange={(value) =>
                      updateRoom(room.id, { spaIncluded: value })
                    }
                  />
                </HStack>
              </Box>

              <Textarea
                className="mt-4 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
                size="md"
              >
                <TextareaInput
                  placeholder="Note su upgrade, benefit inclusi o richieste particolari..."
                  value={room.notes}
                  onChangeText={(value) => updateRoom(room.id, { notes: value })}
                  numberOfLines={3}
                />
              </Textarea>

              <Button
                variant="outline"
                action="negative"
                size="sm"
                className="mt-4 self-start rounded-full border-[rgba(220,38,38,0.4)] bg-transparent px-4"
                onPress={() => removeRoomEntry(room.id)}
                isDisabled={rooms.length === 1}
              >
                <Trash2 size={16} color="#dc2626" />
                <Text className="text-xs font-semibold uppercase tracking-[0.14em] text-[#dc2626]">
                  Rimuovi tipologia
                </Text>
              </Button>
            </Box>
          ))}
        </VStack>
      </SectionCard>

      <SectionCard
        title="Prossimo evento e pagamento"
        subtitle="Allinea le automazioni impostando il prossimo step e il metodo di incasso."
        contentClassName="space-y-6"
      >
        <HStack className="flex-col gap-4 md:flex-row">
          <Select
            selectedValue={nextEvent}
            onValueChange={setNextEvent}
            className="w-full md:flex-1"
          >
            <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
              <SelectInput placeholder="Prossimo evento" />
              <SelectChevron as={ChevronDown} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent className="max-h-[360px] w-full">
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {BOOKING_NEXT_EVENTS.map((event) => (
                  <SelectItem key={event.value} label={event.label} value={event.value} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Select
            selectedValue={paymentMethod}
            onValueChange={setPaymentMethod}
            className="w-full md:flex-1"
          >
            <SelectTrigger className="h-11 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] px-4">
              <SelectInput placeholder="Metodo di pagamento" />
              <SelectChevron as={ChevronDown} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent className="max-h-[320px] w-full">
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem
                    key={method.value}
                    label={method.label}
                    value={method.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>
        <Textarea
          className="rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)]"
          size="md"
        >
          <TextareaInput
            placeholder="Note interne (es. documento già acquisito, acconto pagato in contanti, richieste speciali...)"
            value={internalNotes}
            onChangeText={setInternalNotes}
            numberOfLines={4}
          />
        </Textarea>
      </SectionCard>

      <SectionCard
        title="Riepilogo rapido"
        subtitle="Un colpo d'occhio prima di confermare l'inserimento della prenotazione."
        contentClassName="space-y-4"
      >
        <HStack className="flex-col gap-4 lg:flex-row">
          <Box className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
            <HStack className="items-center gap-3">
              <Hotel size={22} color="#aa6a24" />
              <Box>
                <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-600)]">
                  Soggiorno
                </Text>
                <Text className="text-base font-semibold text-[var(--color-neutral-900)]">
                  {checkIn || '—'} → {checkOut || '—'}
                </Text>
                <Text className="text-xs text-[var(--color-neutral-500)]">
                  {guestCount} ospiti · {childrenCount} bambini
                </Text>
              </Box>
            </HStack>
          </Box>

          <Box className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
            <HStack className="items-center gap-3">
              <ClipboardCheck size={22} color="#aa6a24" />
              <Box>
                <Text className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-600)]">
                  Automazione
                </Text>
                <Text className="text-base font-semibold text-[var(--color-neutral-900)]">
                  Prossimo evento: {nextEvent ? BOOKING_NEXT_EVENTS.find((event) => event.value === nextEvent)?.label : '—'}
                </Text>
                <Text className="text-xs text-[var(--color-neutral-500)]">
                  Metodo pagamento: {PAYMENT_METHODS.find((method) => method.value === paymentMethod)?.label ?? '—'}
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
            Aggiungi prenotazione
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
            setCheckIn('');
            setCheckOut('');
            setGuestCount('2');
            setChildrenCount('0');
            setRooms([createRoomEntry()]);
            setNextEvent('');
            setPaymentMethod('manual');
            setInternalNotes('');
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
