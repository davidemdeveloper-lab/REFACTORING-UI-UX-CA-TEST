'use client';

import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Popover, PopoverBackdrop, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { useAccent } from '@/components/theme/accent-provider';
import { Palette } from 'lucide-react-native';

export const AccentSelector = () => {
  const { accents, accent, setAccent } = useAccent();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement="bottom right">
      <PopoverTrigger>
        <Pressable
          onPress={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
        >
          <Box
            className="h-7 w-7 rounded-xl"
            style={{ background: 'var(--accent-gradient)' }}
          />
          <Text className="text-xs font-medium text-white">Accento</Text>
          <Icon as={Palette} size={18} color="rgba(255,255,255,0.6)" />
        </Pressable>
      </PopoverTrigger>
      <PopoverBackdrop />
      <PopoverContent className="w-60 rounded-2xl border border-white/10 bg-[#0f1520]/90 p-4 shadow-2xl backdrop-blur-2xl">
        <Text className="text-xs uppercase tracking-[0.25em] text-white/60">
          Tavolozza colori
        </Text>
        <HStack className="mt-3 flex-wrap gap-2">
          {accents.map((option) => {
            const isActive = option.id === accent.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => {
                  setAccent(option);
                  setIsOpen(false);
                }}
                className={`flex h-16 flex-1 min-w-[44%] items-center gap-3 rounded-2xl border px-3 py-2 transition ${
                  isActive
                    ? 'border-white/30 bg-white/10 shadow-lg shadow-[var(--accent-glow)]'
                    : 'border-white/5 bg-white/5'
                }`}
                style={{ background: option.gradient }}
              >
                <Box className="h-9 w-9 rounded-xl border border-white/30" style={{ backgroundColor: option.value }} />
                <Text className="text-[0.7rem] font-semibold text-[#06101c] drop-shadow-lg">
                  {option.name}
                </Text>
              </Pressable>
            );
          })}
        </HStack>
      </PopoverContent>
    </Popover>
  );
};
