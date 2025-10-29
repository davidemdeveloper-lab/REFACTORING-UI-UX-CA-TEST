'use client';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/layout/UiIcon';
import { palette } from '@/design/palette';
import { Input } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';

export const TopBar = () => {
  return (
    <Box
      style={{
        padding: '18px 24px',
        borderBottom: `1px solid ${palette.borderSoft}`,
        background: palette.surface,
        backdropFilter: 'blur(18px)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <HStack space="lg" className="items-center justify-between">
        <HStack space="md" className="items-center">
          <Pressable
            style={{
              borderRadius: 14,
              padding: 10,
              border: `1px solid ${palette.glassStroke}`,
              background: palette.surfaceAlt,
            }}
          >
            <Icon name="Menu" size={18} color={palette.textSecondary} />
          </Pressable>
          <VStack>
            <Text className="text-lg font-semibold" style={{ color: palette.textPrimary }}>
              Ben tornato, Davide
            </Text>
            <Text className="text-xs" style={{ color: palette.textMuted }}>
              Automazioni attive su 3 strutture - 5 notifiche AI
            </Text>
          </VStack>
        </HStack>
        <HStack space="md" className="items-center">
          <Box
            style={{
              position: 'relative',
              width: 280,
            }}
          >
            <Input
              placeholder="Cerca ospiti, prenotazioni, servizi..."
              className="pl-10 pr-4 py-2 rounded-xl"
              style={{
                backgroundColor: 'rgba(17, 24, 38, 0.65)',
                borderColor: palette.glassStroke,
                color: palette.textPrimary,
              }}
            />
            <Box style={{ position: 'absolute', top: 12, left: 12 }}>
              <Icon name="Search" size={16} color={palette.textMuted} />
            </Box>
          </Box>
          <Pressable
            style={{
              borderRadius: '999px',
              padding: 10,
              background: palette.surfaceAlt,
              border: `1px solid ${palette.borderHighlight}`,
              position: 'relative',
            }}
          >
            <Icon name="Bell" size={20} color={palette.accentPrimary} />
            <Box
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: palette.accentAlert,
                border: `1px solid ${palette.surface}`,
              }}
            />
          </Pressable>
          <Pressable
            style={{
              borderRadius: 16,
              padding: 10,
              background: palette.surfaceAlt,
              border: `1px solid ${palette.glassStroke}`,
            }}
          >
            <HStack space="sm" className="items-center">
              <Icon name="Sparkles" size={18} color={palette.accentSecondary} />
              <Text className="text-sm" style={{ color: palette.accentSecondary }}>
                Hub IA
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
};
