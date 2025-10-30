'use client';

import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  InputField,
  Avatar,
  AvatarFallbackText,
  Badge,
  Button,
} from '@gluestack-ui/themed';
import { Search, Sparkles } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useMemo } from 'react';

const propertyOptions = ['Aurora Sky Suites', 'Laguna Bianca Resort', 'Borgo Art Hotel'];

export const TopBar = () => {
  const selectedProperty = useUIStore((state) => state.selectedProperty);
  const setSelectedProperty = useUIStore((state) => state.setSelectedProperty);
  const heroCopy = useMemo(() => {
    if (selectedProperty === 'Laguna Bianca Resort') {
      return 'Laguna Bianca è pronta a lanciare automazioni per il nuovo spa deck.';
    }
    if (selectedProperty === 'Borgo Art Hotel') {
      return 'Mostra agli ospiti le tue nuove stanze immersive e guida l upsell locale.';
    }
    return 'Aurora Sky Suites tiene il 92% delle conversazioni automatizzate con tono umano.';
  }, [selectedProperty]);

  return (
    <Box
      px="$8"
      py="$6"
      bg="rgba(15, 23, 42, 0.55)"
      borderBottomWidth={1}
      borderColor="rgba(255, 255, 255, 0.08)"
      sx={{ backdropFilter: 'blur(calc(var(--glass-blur) - 8px))' }}
    >
      <HStack space="lg" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <HStack space="lg" alignItems="center" flexWrap="wrap">
          <VStack space="xs">
            <Text color="rgba(148, 163, 184, 0.9)" fontSize="$sm">
              Struttura connessa
            </Text>
            <PropertySelect
              value={selectedProperty}
              onChange={(value) => setSelectedProperty(value)}
            />
          </VStack>
          <Badge
            variant="solid"
            bg="rgba(79, 140, 255, 0.18)"
            borderColor="transparent"
          >
            <HStack space="sm" alignItems="center">
              <Sparkles size={16} color="#8CB6FF" />
              <Text color="#dbeafe" fontWeight="$semibold">
                5 automazioni live oggi
              </Text>
            </HStack>
          </Badge>
        </HStack>
        <HStack space="lg" alignItems="center" flexWrap="wrap">
          <SearchInput />
          <UserAvatar />
        </HStack>
      </HStack>
      <Box
        mt="$6"
        px="$6"
        py="$5"
        rounded="$2xl"
        bg="rgba(255, 255, 255, 0.08)"
        borderWidth={1}
        borderColor="rgba(255, 255, 255, 0.15)"
        sx={{ backdropFilter: 'blur(calc(var(--glass-blur) - 10px))' }}
      >
        <HStack space="lg" justifyContent="space-between" flexWrap="wrap" alignItems="center">
          <VStack space="xs" maxWidth="560px">
            <Text color="rgba(226, 232, 240, 0.88)" fontSize="$lg" fontWeight="$semibold">
              {heroCopy}
            </Text>
            <Text color="rgba(148, 163, 184, 0.9)" fontSize="$sm">
              Le automazioni di Customer Automator lavorano 24/7: timeline, chat e dispositivi si sincronizzano senza stress.
            </Text>
          </VStack>
          <Button
            variant="solid"
            bg="rgba(79, 140, 255, 0.9)"
            borderColor="transparent"
            px="$6"
            py="$3"
          >
            <Text color="white" fontWeight="$semibold">
              Crea automazione rapida
            </Text>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

const SearchInput = () => (
  <Input
    width={260}
    bg="rgba(255, 255, 255, 0.08)"
    borderColor="rgba(255, 255, 255, 0.2)"
    rounded="$full"
    px="$3"
  >
    <HStack alignItems="center" space="sm">
      <Search size={16} color="rgba(148, 163, 184, 0.9)" />
      <InputField
        placeholder="Cerca clienti, prenotazioni o dispositivi"
        color="rgba(226, 232, 240, 0.92)"
      />
    </HStack>
  </Input>
);

const UserAvatar = () => (
  <HStack alignItems="center" space="sm">
    <Avatar bg="rgba(79, 140, 255, 0.25)" size="md" borderWidth={1} borderColor="rgba(79, 140, 255, 0.5)">
      <AvatarFallbackText color="white">DM</AvatarFallbackText>
    </Avatar>
    <VStack space="xs">
      <Text color="rgba(226, 232, 240, 0.95)" fontWeight="$semibold">
        Davide Minerva
      </Text>
      <Text color="rgba(148, 163, 184, 0.85)" fontSize="$xs">
        Concierge Digitale
      </Text>
    </VStack>
  </HStack>
);

const PropertySelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <Box
    px="$4"
    py="$3"
    rounded="$xl"
    bg="rgba(255, 255, 255, 0.08)"
    borderWidth={1}
    borderColor="rgba(255, 255, 255, 0.2)"
    sx={{ position: 'relative' }}
  >
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{
        appearance: 'none',
        background: 'transparent',
        border: 'none',
        color: 'rgba(226, 232, 240, 0.95)',
        fontSize: '16px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        paddingRight: '1.5rem',
      }}
    >
      {propertyOptions.map((option) => (
        <option key={option} value={option} style={{ color: '#0F172A' }}>
          {option}
        </option>
      ))}
    </select>
    <Box position="absolute" right={14} top={16} pointerEvents="none">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.5L6 6.5L11 1.5" stroke="rgba(226, 232, 240, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </Box>
  </Box>
);
