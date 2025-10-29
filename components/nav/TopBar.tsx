'use client';

import { HStack, Input, InputField, Icon, Text, Avatar, AvatarImage, Box } from '@gluestack-ui/themed';
import { Search, Bell } from 'lucide-react';
import { GlassPanel } from '@/components/common/GlassPanel';
import { IconButton } from '@/components/common/IconButton';
import { useAppSelector } from '@/lib/hooks';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

export const TopBar = () => {
  const unread = useAppSelector((state) => state.notifications.items.filter((item) => !item.read).length);

  return (
    <GlassPanel padding={12} className="top-bar">
      <HStack alignItems="center" justifyContent="space-between" space="lg">
        <Text fontSize={16} fontWeight="600">
          Benvenuto in Customer Automator
        </Text>
        <HStack flex={1} ml={16} mr={16} alignItems="center" space="md">
          <Input
            borderColor={tokens.surfaces.glassPanel.borderColor}
            bg="rgba(15,23,42,0.35)"
            size="md"
            flex={1}
            minWidth={180}
          >
            <Icon as={Search} mr={8} color={palette.steel[200]} />
            <InputField placeholder="Cerca clienti, prenotazioni, template…" aria-label="Cerca" />
          </Input>
          <IconButton icon={Bell} label="Notifiche" badgeContent={unread > 0 ? unread : null} />
          <HStack alignItems="center" space="sm" role="button" tabIndex={0} aria-label="Menu utente">
            <Avatar size="sm">
              <AvatarImage alt="Davide Mineo" src="https://i.pravatar.cc/64?img=5" />
            </Avatar>
            <VCardUser />
          </HStack>
        </HStack>
      </HStack>
    </GlassPanel>
  );
};

const VCardUser = () => (
  <Box textAlign="right">
    <Text fontSize={13} fontWeight="600">
      Davide Mineo
    </Text>
    <Text fontSize={11} color={palette.steel[200]}>
      GM · Alya Resort
    </Text>
  </Box>
);
