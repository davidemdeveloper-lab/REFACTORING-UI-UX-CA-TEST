'use client';

import React from 'react';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Moon, SunMedium } from 'lucide-react-native';
import { useAccent } from '@/components/theme/accent-provider';

export const ModeSelector = () => {
  const { mode, setMode } = useAccent();
  const isDark = mode === 'dark';

  return (
    <Pressable
      onPress={() => setMode(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
    >
      <Icon
        as={isDark ? SunMedium : Moon}
        color="rgba(255,255,255,0.65)"
        size={18}
      />
      <HStack className="items-baseline gap-1">
        <Text className="text-xs uppercase tracking-[0.25em] text-white/50">
          {isDark ? 'Notte' : 'Giorno'}
        </Text>
        <Text className="text-xs font-semibold text-white">
          {isDark ? 'Modalità Aurora' : 'Modalità Soffusa'}
        </Text>
      </HStack>
    </Pressable>
  );
};
