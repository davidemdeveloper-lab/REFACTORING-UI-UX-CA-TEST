'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { ArrowRight } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';

type BadgeTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const badgeToneStyles: Record<BadgeTone, string> = {
  info: 'bg-[rgba(59,130,246,0.16)] text-[#1d4ed8]',
  success: 'bg-[rgba(22,163,74,0.18)] text-[#15803d]',
  warning: 'bg-[rgba(234,179,8,0.2)] text-[#b45309]',
  danger: 'bg-[rgba(239,68,68,0.2)] text-[#b91c1c]',
  neutral: 'bg-[rgba(148,163,184,0.18)] text-[#475467]',
};

const badgeToneTextColor: Record<BadgeTone, string> = {
  info: 'text-[#1d4ed8]',
  success: 'text-[#15803d]',
  warning: 'text-[#b45309]',
  danger: 'text-[#b91c1c]',
  neutral: 'text-[var(--color-neutral-600)]',
};

type EntityCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  badges?: { label: string; tone?: BadgeTone }[];
  meta?: { label: string; value: string; emphasize?: boolean }[];
  badgesSecondary?: ReactNode;
  status?: { label: string; tone?: BadgeTone };
  rightAccessory?: ReactNode;
  onPress?: () => void;
};

export function EntityCard({
  title,
  subtitle,
  description,
  badges = [],
  meta = [],
  badgesSecondary,
  status,
  rightAccessory,
  onPress,
}: EntityCardProps) {
  const Container = onPress ? Pressable : Box;

  return (
    <Container
      onPress={onPress}
      className="group/card mb-4 rounded-3xl border border-transparent bg-[var(--color-surface)] px-5 py-5 transition-all duration-150 data-[hover=true]:border-[#aa6a24] data-[hover=true]:shadow-[0_12px_30px_rgba(36,30,18,0.12)]"
    >
      <HStack className="items-start justify-between gap-6">
        <VStack space="md" className="flex-1">
          <Box>
            <HStack className="items-center gap-3">
              <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                {title}
              </Text>
              {status ? (
                <Badge
                  size="sm"
                  action="muted"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    badgeToneStyles[status.tone ?? 'info']
                  }`}
                >
                  <Text className={`text-xs font-semibold ${badgeToneTextColor[status.tone ?? 'info']}`}>
                    {status.label}
                  </Text>
                </Badge>
              ) : null}
            </HStack>
            {subtitle ? (
              <Text className="mt-1 text-sm text-[var(--color-neutral-600)]">
                {subtitle}
              </Text>
            ) : null}
            {description ? (
              <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-500)]">
                {description}
              </Text>
            ) : null}
          </Box>
          {badges.length > 0 ? (
            <HStack className="flex-row flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge
                  key={badge.label}
                  size="sm"
                  action="muted"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    badgeToneStyles[badge.tone ?? 'neutral']
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${badgeToneTextColor[badge.tone ?? 'neutral']}`}
                  >
                    {badge.label}
                  </Text>
                </Badge>
              ))}
            </HStack>
          ) : null}
          {badgesSecondary ? badgesSecondary : null}
          {meta.length > 0 ? (
            <Box className="grid gap-4 md:grid-cols-2">
              {meta.map((item) => (
                <Box key={item.label}>
                  <Text className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
                    {item.label}
                  </Text>
                  <Text
                    className={`mt-1 text-sm ${
                      item.emphasize
                        ? 'font-semibold text-[var(--color-neutral-900)]'
                        : 'text-[var(--color-neutral-600)]'
                    }`}
                  >
                    {item.value}
                  </Text>
                </Box>
              ))}
            </Box>
          ) : null}
        </VStack>
        <Box className="flex-row items-center gap-3">
          {rightAccessory}
          {onPress ? (
            <Box className="h-10 w-10 items-center justify-center rounded-full bg-[rgba(196,123,44,0.12)]">
              <ArrowRight size={18} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
            </Box>
          ) : null}
        </Box>
      </HStack>
    </Container>
  );
}
