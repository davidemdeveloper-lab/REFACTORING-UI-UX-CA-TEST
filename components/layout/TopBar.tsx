'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Icon,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Bell, Menu, Search } from 'lucide-react';
import { useMemo } from 'react';

const titles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Dashboard',
    subtitle: 'Panoramica clienti, prenotazioni e automazioni attive',
  },
  '/clients': {
    title: 'Clienti',
    subtitle: 'Dati aggiornati in tempo reale su fidelizzazione e soggiorni',
  },
  '/clients/new': {
    title: 'Accogli Cliente',
    subtitle: 'Crea nuove proposte e segmenta ospiti appena arrivati',
  },
  '/bookings': {
    title: 'Prenotazioni',
    subtitle: 'Gestisci pipeline, stati e follow-up delle prenotazioni',
  },
  '/bookings/new-lost': {
    title: 'Riconquista Prenotazione',
    subtitle: 'Automazioni per convertire richieste perse in nuove opportunità',
  },
  '/templates': {
    title: 'Template Email',
    subtitle: 'Crea blocchi dinamici e test A/B per le comunicazioni',
  },
  '/chat': {
    title: 'Chat Omnicanale',
    subtitle: 'Centralizza conversazioni dirette e prenotazioni assistite',
  },
  '/notifications': {
    title: 'Notifiche',
    subtitle: 'Controlla alert di sistema, follow-up e escalation',
  },
  '/iot': {
    title: 'Dispositivi Connessi',
    subtitle: 'Monitoraggio in tempo reale dei device in struttura',
  },
};

interface TopBarProps {
  onToggleNav: () => void;
}

export function TopBar({ onToggleNav }: TopBarProps) {
  const pathname = usePathname();
  const page = useMemo(() => titles[pathname] ?? titles['/dashboard'], [pathname]);

  return (
    <HStack
      as="header"
      position="absolute"
      top={0}
      left={0}
      right={0}
      px="$10"
      py="$6"
      alignItems="center"
      justifyContent="space-between"
      gap="$8"
      bgColor="rgba(10, 17, 30, 0.72)"
      borderBottomWidth={1}
      borderColor="rgba(255,255,255,0.14)"
      style={{ backdropFilter: 'blur(18px)' }}
      zIndex={10}
    >
      <HStack alignItems="center" gap="$4" flex={1}>
        <Box display={{ base: 'flex', lg: 'none' }}>
          <Button
            size="sm"
            variant="outline"
            aria-label="Apri navigazione"
            onPress={onToggleNav}
          >
            <Icon as={Menu} color="$background50" />
          </Button>
        </Box>
        <VStack gap="$1">
          <Heading size="xl" color="$background50">
            {page.title}
          </Heading>
          <Text color="rgba(226,235,255,0.62)" fontSize="$sm">
            {page.subtitle}
          </Text>
        </VStack>
      </HStack>

      <HStack gap="$4" alignItems="center" flexShrink={0}>
        <Input
          maxWidth={{ base: '200px', md: '320px' }}
          borderColor="rgba(255,255,255,0.22)"
          bgColor="rgba(255,255,255,0.05)"
          borderRadius="$xl"
        >
          <InputField placeholder="Cerca clienti, prenotazioni, dispositivi..." color="$background50" />
          <Icon
            as={Search}
            color="rgba(226,235,255,0.62)"
            marginRight="$3"
            aria-hidden
          />
        </Input>
        <Button
          size="sm"
          variant="outline"
          aria-label="Notifiche"
          asChild
        >
          <NextLink href="/notifications">
            <Icon as={Bell} color="$background50" />
          </NextLink>
        </Button>
        <Button variant="outline" borderColor="rgba(255,255,255,0.24)" bgColor="rgba(255,255,255,0.06)" asChild>
          <NextLink href="/bookings/new-lost">
            <ButtonText color="$background50">Nuova Automazione</ButtonText>
          </NextLink>
        </Button>
        <HStack alignItems="center" gap="$3">
          <Avatar bgColor="rgba(79,111,255,0.45)" borderRadius="$xl" size="md">
            <AvatarFallbackText color="$background50">DM</AvatarFallbackText>
          </Avatar>
          <VStack>
            <Text color="$background50" fontWeight="$bold">
              Davide Minerva
            </Text>
            <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
              Hotel Aurora Resort
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </HStack>
  );
}
