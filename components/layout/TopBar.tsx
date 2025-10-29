'use client';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/input-field';
import { InputIcon } from '@/components/ui/input/input-icon';
import { InputSlot } from '@/components/ui/input/input-slot';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallbackText } from '@/components/ui/avatar/avatar-fallback-text';
import { AvatarImage } from '@/components/ui/avatar/avatar-image';
import { Pressable } from '@/components/ui/pressable';
import { Search, Bell, ChevronDown } from 'lucide-react-native';
import { palette } from '@/theme/palette';

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  return (
    <Box
      className="w-full border-b border-white/5 px-8 py-6"
      style={{
        backgroundColor: 'rgba(13, 18, 27, 0.72)',
        backdropFilter: 'blur(18px)',
      }}
    >
      <HStack className="items-center justify-between gap-6">
        <VStack className="gap-1">
          <Text className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Customer Automator
          </Text>
          <Text className="text-3xl font-semibold text-gradient-primary">{title}</Text>
        </VStack>
        <HStack className="items-center gap-6">
          <Input
            size="lg"
            className="min-w-[280px] rounded-full border-white/10 bg-white/5 px-2"
          >
            <InputSlot className="pl-3">
              <InputIcon>
                <Search color={palette.text.secondary} size={18} strokeWidth={1.6} />
              </InputIcon>
            </InputSlot>
            <InputField
              placeholder="Cerca clienti, prenotazioni o template"
              placeholderTextColor="rgba(226,232,240,0.6)"
              style={{ color: palette.text.primary }}
            />
          </Input>
          <Pressable
            className="relative rounded-2xl border border-white/10 bg-white/5 p-3"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 20,
            }}
          >
            <Bell color={palette.intent.accent} size={22} strokeWidth={1.5} />
            <Box className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-rose-500">
              <Text className="text-[10px] font-bold text-white">3</Text>
            </Box>
          </Pressable>
          <Pressable className="items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <HStack className="items-center gap-3">
              <Avatar className="h-10 w-10 border border-white/20">
                <AvatarFallbackText className="text-white">DM</AvatarFallbackText>
                <AvatarImage
                  alt="Davide Minerva"
                  source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                />
              </Avatar>
              <VStack className="gap-0.5">
                <Text className="text-sm font-semibold text-white">Davide Minerva</Text>
                <Text className="text-xs text-slate-400">Hotel Aurora Milano</Text>
              </VStack>
              <ChevronDown color={palette.text.secondary} size={18} strokeWidth={1.4} />
            </HStack>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  );
}
