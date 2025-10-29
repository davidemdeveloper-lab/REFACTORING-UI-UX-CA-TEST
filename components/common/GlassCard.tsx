import type { ComponentProps } from 'react';
import { Box } from '@gluestack-ui/themed';

export type GlassCardProps = ComponentProps<typeof Box>;

export const GlassCard = ({ children, ...props }: GlassCardProps) => (
  <Box
    px="$6"
    py="$6"
    rounded="$2xl"
    bg="rgba(15, 23, 42, 0.58)"
    borderWidth={1}
    borderColor="rgba(255, 255, 255, 0.12)"
    sx={{
      backdropFilter: 'blur(calc(var(--glass-blur) - 6px))',
      boxShadow: 'var(--glass-shadow)',
    }}
    {...props}
  >
    {children}
  </Box>
);
