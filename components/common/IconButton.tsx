'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Box, Badge } from '@gluestack-ui/themed';
import type { LucideIcon } from 'lucide-react';
import { tokens } from '@/theme/tokens';
import { palette } from '@/theme/palette';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  icon: LucideIcon;
  label: string;
  badgeContent?: string | number | null;
  tone?: 'accent' | 'teal' | 'neutral';
}

const toneStyles: Record<Required<IconButtonProps>['tone'], { bg: string; border: string; icon: string }> = {
  accent: {
    bg: 'rgba(59,130,246,0.18)',
    border: 'rgba(59,130,246,0.45)',
    icon: palette.accent[400]
  },
  teal: {
    bg: 'rgba(20,181,219,0.18)',
    border: 'rgba(20,181,219,0.45)',
    icon: palette.teal[400]
  },
  neutral: {
    bg: 'rgba(148,163,184,0.12)',
    border: 'rgba(148,163,184,0.25)',
    icon: palette.steel[200]
  }
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, label, badgeContent, tone = 'accent', ...props }, ref) => {
    const styles = toneStyles[tone];

    return (
      <Box
        as="button"
        type="button"
        ref={ref}
        aria-label={label}
        px={12}
        py={8}
        borderRadius={tokens.radii.md}
        bg={styles.bg}
        borderWidth={1}
        borderColor={styles.border}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
        _hover={{ transform: 'translateY(-1px)' }}
        _focusVisible={{ outline: '2px solid rgba(94,161,250,0.7)', outlineOffset: '2px' }}
        {...props}
      >
        <Icon size={18} color={styles.icon} aria-hidden />
        {badgeContent ? (
          <Badge
            position="absolute"
            top={-6}
            right={-6}
            size="sm"
            borderRadius={tokens.radii.md}
            bg={palette.accent[600]}
            color={palette.neutrals.white}
            px={6}
            py={2}
          >
            {badgeContent}
          </Badge>
        ) : null}
      </Box>
    );
  }
);

IconButton.displayName = 'IconButton';
