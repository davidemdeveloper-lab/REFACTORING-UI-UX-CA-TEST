import { palette } from './palette';
import { tokens } from './tokens';

// Simple theme config for Gluestack UI v1
export const gluestackTheme = {
  tokens: {
    colors: {
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
    },
    radii: {
      sm: tokens.radii.sm,
      md: tokens.radii.md,
      lg: tokens.radii.lg,
      xl: tokens.radii.xl,
      glass: tokens.radii.glass
    },
    shadows: {
      soft: tokens.shadows.soft,
      glass: tokens.shadows.glass
    },
    blurs: tokens.blurs
  }
};

export type GluestackTheme = typeof gluestackTheme;
