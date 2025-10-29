'use client';

import { Box } from '@gluestack-ui/themed';
import { tokens } from '@/theme/tokens';
import { palette } from '@/theme/palette';
import { memo, type CSSProperties } from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  padding?: number;
  borderless?: boolean;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export const GlassPanel = memo(
  ({ children, padding = 16, borderless, className, style, ...rest }: GlassPanelProps) => (
    <Box
      className={className}
      px={padding}
      py={padding}
      borderRadius={tokens.radii.glass}
      bg={tokens.surfaces.glassPanel.backgroundColor}
      borderWidth={borderless ? 0 : 1}
      borderColor={tokens.surfaces.glassPanel.borderColor}
      sx={{
        backdropFilter: `blur(${tokens.surfaces.glassPanel.backdropBlur})`,
        boxShadow: tokens.shadows.glass,
        color: palette.neutrals.offwhite
      }}
      style={style}
      {...rest}
    >
      {children}
    </Box>
  )
);

GlassPanel.displayName = 'GlassPanel';
