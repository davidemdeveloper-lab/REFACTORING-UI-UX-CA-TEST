import type { GSConfig } from '@gluestack-style/react';
import { config as baseConfig } from '@gluestack-ui/themed';
import { palette } from './palette';
import { tokens } from './tokens';

const base = baseConfig as unknown as {
  tokens: Record<string, Record<string, unknown>>;
  components?: Record<string, unknown>;
};

const colors = {
  ...base.tokens?.colors,
  background: palette.steel[900],
  border: palette.neutrals.outline,
  text: palette.neutrals.offwhite,
  accent: palette.accent[600],
  cobalt: palette.accent[500],
  teal: palette.teal[500],
  success: palette.state.success,
  warning: palette.state.warning,
  danger: palette.state.danger,
  info: palette.state.info,
  steel: palette.steel,
  graphite: palette.graphite,
  glass: palette.glass
};

export const gluestackTheme = {
  ...base,
  tokens: {
    ...base.tokens,
    colors,
    radii: {
      ...(base.tokens?.radii as Record<string, unknown>),
      sm: tokens.radii.sm,
      md: tokens.radii.md,
      lg: tokens.radii.lg,
      xl: tokens.radii.xl,
      glass: tokens.radii.glass
    },
    shadows: {
      ...(base.tokens?.shadows as Record<string, unknown>),
      soft: tokens.shadows.soft,
      glass: tokens.shadows.glass
    },
    blurs: tokens.blurs
  },
  components: {
    ...base.components,
    Button: {
      ...(base.components?.Button as Record<string, unknown>),
      variants: {
        ...(base.components?.Button as { variants?: Record<string, unknown> })?.variants,
        solid: {
          bg: '$accent',
          _hover: { bg: '$cobalt' },
          _pressed: { bg: '$accent' },
          _focusVisible: { shadowColor: '$accent', shadow: '$shadows$soft' }
        },
        outline: {
          borderWidth: 1,
          borderColor: '$accent',
          color: '$accent',
          _hover: { bg: 'rgba(91,132,255,0.08)' },
          _focusVisible: { borderColor: '$cobalt', shadow: '$shadows$soft' }
        }
      }
    },
    Card: {
      ...(base.components?.Card as Record<string, unknown>),
      defaultProps: {
        ...(base.components?.Card as { defaultProps?: Record<string, unknown> })?.defaultProps,
        bg: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: '$glass',
        rounded: '$glass'
      }
    }
  }
} as unknown as GSConfig;

export type GluestackTheme = typeof gluestackTheme;
