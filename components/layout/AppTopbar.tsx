'use client';

import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { palette } from '@/theme/palette';
import { Bell, Search, Sparkles } from 'lucide-react-native';

export function AppTopbar() {
  return (
    <HStack
      px={32}
      py={20}
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor={palette.glassStroke}
      bg="rgba(6,11,22,0.55)"
      style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
    >
      <VStack space="xs">
        <Text fontSize={18} fontWeight="700" color={palette.textPrimary}>
          Benvenuto, Davide
        </Text>
        <HStack space="sm" alignItems="center">
          <Sparkles size={16} color={palette.accentSecondary} />
          <Text fontSize={13} color={palette.textMuted}>
            3 suggerimenti AI pronti per migliorare il guest journey odierno
          </Text>
        </HStack>
      </VStack>

      <HStack space="md" alignItems="center">
        <Box w={280}>
          <Input
            size="md"
            variant="outline"
            borderColor="rgba(56,189,248,0.25)"
            bg="rgba(8,15,28,0.65)"
            borderRadius={20}
          >
            <Search size={18} color={palette.textMuted} style={{ marginHorizontal: 12 }} />
            <InputField placeholder="Cerca clienti, prenotazioni, template..." color={palette.textSecondary} />
          </Input>
        </Box>
        <NotificationBell />
        <Box
          w={40}
          h={40}
          borderRadius={999}
          bg="rgba(56,189,248,0.18)"
          borderColor="rgba(56,189,248,0.35)"
          borderWidth={1}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="700" color={palette.accentPrimary}>
            D
          </Text>
        </Box>
      </HStack>
    </HStack>
  );
}

function NotificationBell() {
  return (
    <Box position="relative">
      <Box
        w={40}
        h={40}
        borderRadius={999}
        alignItems="center"
        justifyContent="center"
        bg="rgba(148,163,184,0.18)"
        borderWidth={1}
        borderColor="rgba(148,163,184,0.25)"
      >
        <Bell size={18} color={palette.textSecondary} />
      </Box>
      <Box
        position="absolute"
        top={4}
        right={4}
        w={16}
        h={16}
        borderRadius={999}
        bg={palette.accentSecondary}
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="#fff"
      >
        <Text fontSize={10} fontWeight="700" color="#fff">
          5
        </Text>
      </Box>
    </Box>
  );
}
