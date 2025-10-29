'use client';

import { VStack, HStack, Text, Box } from '@gluestack-ui/themed';
import { LucideIcon } from 'lucide-react';
import { tokens } from '@/theme/tokens';
import { palette } from '@/theme/palette';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface GlassCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const GlassCard = ({ title, description, icon: Icon, action, children }: GlassCardProps) => (
  <MotionBox
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    borderRadius={tokens.radii.glass}
    bg={tokens.surfaces.glassPanel.backgroundColor}
    borderWidth={1}
    borderColor={tokens.surfaces.glassPanel.borderColor}
    p={16}
    sx={{
      backdropFilter: `blur(${tokens.surfaces.glassPanel.backdropBlur})`,
      boxShadow: tokens.shadows.glass
    }}
  >
    <VStack space="sm">
      <HStack space="sm" alignItems="center" justifyContent="space-between">
        <HStack space="sm" alignItems="center">
          {Icon ? (
            <Box
              p={10}
              borderRadius={tokens.radii.md}
              bg="rgba(59,130,246,0.2)"
              borderWidth={1}
              borderColor="rgba(59,130,246,0.35)"
            >
              <Icon size={18} color={palette.accent[400]} aria-hidden />
            </Box>
          ) : null}
          <Text fontSize={18} fontWeight="700">
            {title}
          </Text>
        </HStack>
        {action}
      </HStack>
      {description ? (
        <Text fontSize={14} color={palette.steel[200]}>
          {description}
        </Text>
      ) : null}
      {children}
    </VStack>
  </MotionBox>
);
