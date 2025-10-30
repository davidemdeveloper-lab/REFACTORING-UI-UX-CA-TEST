'use client';

import { useMemo } from 'react';
import { useThemeContext } from '@/components/providers/theme-provider';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import type { AccentTone } from '@/lib/types';

const ACCENT_PRESETS: Array<{
  tone: AccentTone;
  label: string;
  gradient: string;
}> = [
  {
    tone: 'aurora',
    label: 'Aurora',
    gradient:
      'linear-gradient(135deg, rgba(70, 200, 255, 0.9), rgba(14, 165, 233, 0.6))',
  },
  {
    tone: 'lagoon',
    label: 'Lagoon',
    gradient:
      'linear-gradient(135deg, rgba(56, 189, 148, 0.9), rgba(20, 184, 166, 0.55))',
  },
  {
    tone: 'orchid',
    label: 'Orchid',
    gradient:
      'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.55))',
  },
  {
    tone: 'sunset',
    label: 'Sunset',
    gradient:
      'linear-gradient(135deg, rgba(249, 115, 22, 0.85), rgba(251, 191, 36, 0.55))',
  },
  {
    tone: 'ember',
    label: 'Ember',
    gradient:
      'linear-gradient(135deg, rgba(239, 68, 68, 0.85), rgba(249, 115, 22, 0.55))',
  },
];

function describeIntensity(value: number) {
  if (value < 0.55) {
    return 'Bagliore soffuso per un mood rilassato';
  }
  if (value < 0.75) {
    return 'Bilanciato: nitido ma ancora delicato';
  }
  if (value < 0.9) {
    return 'Riflessi brillanti per enfatizzare le card';
  }
  return 'Massima brillantezza per un look futuristico';
}

export function AccentSelector() {
  const { accent, setAccent, accentIntensity, setAccentIntensity } =
    useThemeContext();

  const intensityDescriptor = useMemo(
    () => describeIntensity(accentIntensity),
    [accentIntensity],
  );

  return (
    <Box>
      <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-typography-500/80">
        Colori accento
      </Text>
      <HStack space="sm" className="mt-3 flex-wrap gap-y-2">
        {ACCENT_PRESETS.map((preset) => (
          <Pressable
            key={preset.tone}
            onPress={() => setAccent(preset.tone)}
            className={`group relative rounded-full border px-0 py-0 ${
              accent === preset.tone
                ? 'border-white/70 shadow-soft-2'
                : 'border-white/20 opacity-80 hover:opacity-100'
            }`}
          >
            <Box
              className="h-10 w-10 rounded-full"
              style={{ backgroundImage: preset.gradient }}
            />
            <Text className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-typography-400/90">
              {preset.label}
            </Text>
          </Pressable>
        ))}
      </HStack>

      <Box className="mt-12">
        <HStack className="items-center justify-between">
          <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-typography-500/80">
            Intensità bagliore
          </Text>
          <Text className="text-xs font-semibold text-typography-400">
            {Math.round(accentIntensity * 100)}%
          </Text>
        </HStack>
        <input
          type="range"
          min={0.4}
          max={1}
          step={0.05}
          value={accentIntensity}
          onChange={(event) =>
            setAccentIntensity(parseFloat(event.target.value))
          }
          aria-label="Intensità accento"
          className="accent-range mt-4"
        />
        <Text className="mt-3 text-[11px] uppercase tracking-[0.18em] text-typography-500/70">
          {intensityDescriptor}
        </Text>
      </Box>
    </Box>
  );
}

