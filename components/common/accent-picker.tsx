'use client';

import { useThemeAccent } from '@/components/theme/theme-provider';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const ACCENT_ORDER = ['aurora', 'royal', 'ember', 'moss'] as const;

export function AccentPicker() {
  const { accent, setAccent, accentMeta } = useThemeAccent();

  const options = useMemo(() => ACCENT_ORDER.map((key) => ({ key, ...accentMeta[key] })), [accentMeta]);

  return (
    <Box className="flex flex-col gap-3">
      <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Accenti</Text>
      <Box className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <Button
            key={option.key}
            size="sm"
            variant="outline"
            action="secondary"
            onPress={() => setAccent(option.key)}
            className={cn(
              'group relative h-16 flex-1 overflow-hidden rounded-2xl border border-white/10 px-4 py-3 transition-all',
              accent === option.key
                ? 'border-primary-500/80 bg-primary-500/10 shadow-[0_0_25px_rgba(52,184,188,0.25)]'
                : 'bg-background-0/30'
            )}
          >
            <Box className="absolute inset-0">
              <Box
                className={cn(
                  'absolute inset-0 opacity-70 blur-xl transition-all duration-500',
                  `bg-gradient-to-r ${option.preview}`,
                  accent === option.key ? 'opacity-100 blur-lg' : 'opacity-50'
                )}
              />
            </Box>
            <Box className="relative z-10 items-start">
              <Text className="font-semibold text-typography-50">{option.label}</Text>
              <Text className="text-[11px] text-typography-300">{option.description}</Text>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
