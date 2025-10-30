'use client';

import { ReactNode } from 'react';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { palette } from '@/theme/palette';
import { Bell, ChevronDown, Hotel, Search, SlidersHorizontal, Sparkles } from 'lucide-react-native';

export function AppTopbar() {
  return (
    <HStack
      className="items-center justify-between"
      style={{
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: palette.glassStroke,
        backgroundColor: 'rgba(6,11,22,0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      } as any}
    >
      <VStack space="xs">
        <Text style={{ fontSize: 18, fontWeight: '700', color: palette.textPrimary } as any}>
          Benvenuto, Davide
        </Text>
        <HStack space="sm" className="items-center">
          <Sparkles size={16} color={palette.accentSecondary} />
          <Text style={{ fontSize: 13, color: palette.textMuted } as any}>
            3 suggerimenti AI pronti per migliorare il guest journey odierno
          </Text>
        </HStack>
        <HStack space="sm" className="items-center">
          <ContextPill icon={<Hotel size={14} color={palette.intent.accent} />} label="Skyline Resort" />
          <ContextPill icon={<SlidersHorizontal size={14} color={palette.intent.accent} />} label="Focus accoglienza" />
        </HStack>
      </VStack>

      <HStack space="md" className="items-center">
        <Box style={{ width: 280 } as any}>
          <Input
            size="md"
            variant="outline"
            style={{
              borderColor: 'rgba(56,189,248,0.25)',
              backgroundColor: 'rgba(8,15,28,0.65)',
              borderRadius: 20,
            } as any}
          >
            <Search size={18} color={palette.textMuted} style={{ marginHorizontal: 12 }} />
            <InputField placeholder="Cerca clienti, prenotazioni, template..." style={{ color: palette.textSecondary } as any} />
          </Input>
        </Box>
        <NotificationBell />
        <Box
          className="items-center justify-center"
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            backgroundColor: 'rgba(56,189,248,0.18)',
            borderColor: 'rgba(56,189,248,0.35)',
            borderWidth: 1,
            borderStyle: 'solid',
          } as any}
        >
          <Text style={{ fontWeight: '700', color: palette.accentPrimary } as any}>
            D
          </Text>
        </Box>
      </HStack>
    </HStack>
  );
}

function ContextPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
      {icon}
      <Text className="text-xs text-slate-200">{label}</Text>
      <ChevronDown size={12} color={palette.textSecondary} />
    </Pressable>
  );
}

function NotificationBell() {
  return (
    <Box style={{ position: 'relative' } as any}>
      <Box
        className="items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          backgroundColor: 'rgba(148,163,184,0.18)',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(148,163,184,0.25)',
        } as any}
      >
        <Bell size={18} color={palette.textSecondary} />
      </Box>
      <Box
        className="items-center justify-center"
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          width: 16,
          height: 16,
          borderRadius: 999,
          backgroundColor: palette.accentSecondary,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#fff',
        } as any}
      >
        <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' } as any}>
          5
        </Text>
      </Box>
    </Box>
  );
}
