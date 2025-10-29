'use client';

import { useThemeContext } from '@/components/providers/theme-provider';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeContext();

  return (
    <Pressable
      onPress={toggleMode}
      className="glass-panel flex flex-row items-center justify-between rounded-2xl px-4 py-3"
    >
      <HStack space="sm" className="items-center">
        <Box
          className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
            mode === 'dark'
              ? 'border-primary-500/60 bg-primary-700/30'
              : 'border-primary-200/60 bg-white/60'
          }`}
        >
          <span className="text-lg">{mode === 'dark' ? '🌙' : '🌞'}</span>
        </Box>
        <Box>
          <Text className="text-sm font-semibold text-typography-600 dark:text-typography-400">
            Tema {mode === 'dark' ? 'Notturno' : 'Diurno'}
          </Text>
          <Text className="text-[11px] text-typography-400/80">
            Cambia atmosfera in un gesto
          </Text>
        </Box>
      </HStack>
      <Box
        className={`h-5 w-10 rounded-full border ${
          mode === 'dark'
            ? 'border-primary-400/80 bg-primary-500/60'
            : 'border-typography-200/80 bg-white/70'
        }`}
      >
        <Box
          className={`h-4 w-4 rounded-full bg-white shadow-soft-1 transition-all ${
            mode === 'dark' ? 'translate-x-[18px]' : 'translate-x-1'
          }`}
        />
      </Box>
    </Pressable>
  );
}

